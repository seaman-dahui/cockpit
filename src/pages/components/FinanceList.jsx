import {
  Button,
  Dropdown,
  Space,
  Tag,
  Tooltip,
  Form,
  Select,
  Table,
  Input,
} from "antd";
import { useEffect, useRef, useState, useCallback } from "react";
import { formatAmount } from "@/utils/index";
import moment from "moment";
import { firstPartList, tenantList } from "@/services/cockpit";
import { debounce } from "lodash";

const sendNoticeStatusEnums = {
  20: "#52c41a",
  10: "rgba(246, 53, 63)",
};
const FinanceList = ({ gotoFinanceAnalysis }, ref) => {
  const actionRef = useRef();
  const [billStatistic, setBillStatistic] = useState({});
  const [projectList, setProjectList] = useState([]);
  const [firstPartLists, setFirstPartList] = useState([]);
  const [tenantLists, setTenantList] = useState([]);

  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [dataSource, setDataSource] = useState({});

  const [formRef] = Form.useForm();

  useEffect(() => {
    // getProjectList();
    // getFirstPartList();
    // getTenantList();
    // getDataSource({ pageNum, pageSize });

    return () => {};
  }, []);

  //   项目列表
  const getProjectList = async () => {
    const res = await simpleProjects({});
    if (res?.code === 0) {
      setProjectList(res.data);
    }
  };

  // 甲方
  const getFirstPartList = () => {
    firstPartList({}).then((res) => {
      if (res?.code === 0) {
        setFirstPartList(res.data || []);
      }
    });
  };
  // 租客
  const getTenantList = () => {
    tenantList({}).then((res) => {
      if (res?.code === 0) {
        setTenantList(res.data || []);
      }
    });
  };

  // 账单统计数据
  const getIncomeBillStatistics = (params) => {
    listStatistics(params).then((res) => {
      if (res?.code === 0) {
        setBillStatistic(res.data || {});
      } else {
        setBillStatistic({});
      }
    });
  };

  const getDataSource = (param) => {
    const params = {
      ...formRef.getFieldsValue(),
      ...param,
      type: 1,
    };
    getIncomeBillStatistics(params);
    getIncomeBillList(params).then((res) => {
      if (res?.code === 0) {
        setDataSource(res?.data || {});
      }
    });
  };

  const changePage = (page, size) => {
    console.log(page, size);
    setPageNum(page);
    setPageSize(size);

    getDataSource({ pageNum: page, pageSize: size });
  };

  const changeSearch = () => {
    setPageNum(1);
    setPageSize(20);
    getDataSource({ pageNum: 1, pageSize: 20 });
  };

  const resetSearch = () => {
    formRef.resetFields();
    changeSearch();
  };

  const columns = [
    {
      title: "账单编号",
      dataIndex: "billNo",
      width: 220,
      ellipsis: true,
    },
    {
      title: "甲方",
      dataIndex: "firstPartName",
      width: 220,
      ellipsis: true,
      render: (text, record) => (
        <Tooltip title={record.firstPartName}>
          <span>{record.firstPartNameAlias || record.firstPartName}</span>
        </Tooltip>
      ),
    },
    {
      title: "项目",
      dataIndex: "projectName",
      width: 150,
      search: false,
      ellipsis: true,
      render: (text, record) => {
        return (
          <span>
            {record.financeBillHouses
              ? record.financeBillHouses[0].projectName
              : "-"}
          </span>
        );
      },
    },
    {
      title: "楼栋/楼层/房号",
      dataIndex: "buildingNumber",
      width: 220,
      search: false,
      ellipsis: true,
      render: (text, record) => {
        const content = (
          <div>
            {record.financeBillHouses.map((v, i) => {
              return (
                <span>
                  {v.buildHouse}
                  {v.isDeleteDesc && (
                    <Tag style={{ color: "rgb(245,34,45)" }}>
                      {v.isDeleteDesc}
                    </Tag>
                  )}
                  {i != record.financeBillHouses.length - 1 ? "，" : ""}
                </span>
              );
            })}
          </div>
        );
        return (
          <Tooltip title={content} placement="topLeft">
            {content}
          </Tooltip>
        );
      },
    },
    {
      title: "合同编号",
      dataIndex: "contractCodeSort",
      width: 180,
      search: false,
      render: (text, record) => {
        return <span>{record.contractCode}</span>;
      },
    },
    {
      title: "租客名称",
      dataIndex: "specialTenantName",
      width: 200,
      ellipsis: true,
    },

    {
      title: "结清状态",
      width: 120,
      dataIndex: "status",
      valueType: "select",
      fieldProps: { mode: "multiple" },
      valueEnum: {
        1: {
          text: "待付款",
        },
        2: {
          text: "待退款",
        },
        3: {
          text: "已结清",
        },
        4: {
          text: "部分结清",
        },
        5: {
          text: "逾期未结清",
        },
        6: {
          text: "待收款",
        },
        7: {
          text: "关闭",
        },
        8: {
          text: "逾期已结清",
        },
        9: {
          text: "逾期部分结清",
        },
        10: {
          text: "未结清",
        },
      },
    },
    {
      title: "应收金额",
      dataIndex: "shouldAmount",
      ellipsis: true,
      width: 150,
      search: false,
      render: (text, record) => {
        return (
          <span>
            {record.shouldAmount && formatAmount(record.shouldAmount)}
          </span>
        );
      },
    },
    {
      title: "实收金额",
      search: false,
      dataIndex: "actualAmount",
      width: 150,
      ellipsis: true,
      render: (text, record) => {
        return (
          <span>
            {record.actualAmount && formatAmount(record.actualAmount)}
          </span>
        );
      },
    },
    {
      title: "需收金额",
      search: false,
      dataIndex: "needAmount",
      width: 150,
      ellipsis: true,
      render: (text, record) => {
        return (
          <span>{record.needAmount && formatAmount(record.needAmount)}</span>
        );
      },
    },
    {
      title: "减免金额",
      search: false,
      dataIndex: "reduceAmount",
      width: 150,
      ellipsis: true,
      render: (text, record) => {
        return (
          <span>
            {record.reduceAmount && formatAmount(record.reduceAmount)}
          </span>
        );
      },
    },
    {
      title: "税额",
      search: false,
      dataIndex: "taxAmount",
      width: 150,
      ellipsis: true,
      render: (text, record) => {
        return (
          <span>{record.taxAmount && formatAmount(record.taxAmount)}</span>
        );
      },
    },
    {
      title: "税率",
      dataIndex: "taxRate",
      ellipsis: true,
      width: 100,
      search: false,
    },

    {
      title: "不含税金额",
      search: false,
      dataIndex: "taxExclusiveAmount",
      width: 150,
      render: (text, record) => {
        return (
          <span>
            {record.taxExclusiveAmount &&
              formatAmount(record.taxExclusiveAmount)}
          </span>
        );
      },
    },
    {
      title: "申请开票金额",
      search: false,
      dataIndex: "invoicingAmount",
      width: 150,
      render: (text, record) => {
        return (
          <span>
            {record.invoicingAmount && formatAmount(record.invoicingAmount)}
          </span>
        );
      },
    },
    {
      title: "已开票金额",
      search: false,
      dataIndex: "invoicedAmount",
      width: 150,
      render: (text, record) => {
        return (
          <span>
            {record.invoicedAmount && formatAmount(record.invoicedAmount)}
          </span>
        );
      },
    },
    {
      title: "滞纳金",
      search: false,
      dataIndex: "overdueRatioValue",
      width: 150,
      render: (text, record) => {
        return (
          <span>
            {record.overdueRatioValue && formatAmount(record.overdueRatioValue)}
          </span>
        );
      },
    },
    {
      title: "缴费通知单",
      search: false,
      dataIndex: "sendNoticeStatusDesc",
      width: 120,
      render: (text, record) => {
        return (
          <Tag
            color={sendNoticeStatusEnums[record.sendNoticeStatus]}
            style={{ margin: 0 }}
          >
            {text}
          </Tag>
        );
      },
    },
    {
      title: "创建日期",
      search: false,
      dataIndex: "createTimeSort",
      width: 120,
      render: (text, record) => {
        return <span>{moment(record.createTime).format("YYYY-MM-DD")}</span>;
      },
    },
    {
      title: "账单类型",
      search: false,
      dataIndex: "typeDesc",
      width: 100,
    },
    {
      title: "联系方式",
      search: false,
      dataIndex: "mobile",
      width: 120,
    },
    {
      title: "逾期状态",
      search: false,
      dataIndex: "overdueStatus",
      width: 100,
    },

    {
      title: "计费周期",
      search: false,
      dataIndex: "chargingEndDateSort",
      width: 230,
      render: (text, record) => {
        return (
          <div>
            <span>{record.chargingStartDate}</span>
            <span>~</span>
            <span>{record.chargingEndDate}</span>
          </div>
        );
      },
    },

    {
      title: "账单备注",
      search: false,
      dataIndex: "remark",
      width: 100,
      ellipsis: true,
    },
    {
      title: "费用类型",
      search: false,
      dataIndex: "name",
      width: 100,
    },

    {
      title: "调整金额",
      search: false,
      dataIndex: "adjustmentAmount",
      width: 150,
      render: (text, record) => {
        return (
          <span>
            {record.adjustmentAmount && formatAmount(record.adjustmentAmount)}
          </span>
        );
      },
    },
    {
      title: "最新入账日期",
      search: false,
      dataIndex: "entryDateSort",
      width: 160,
      ellipsis: false,
      render: (text, record) => {
        return (
          <span>
            {record.settleTime
              ? moment(record.settleTime).format("YYYY-MM-DD")
              : "-"}
          </span>
        );
      },
    },
    {
      title: "应收日期",
      search: false,
      dataIndex: "paymentDate",
      width: 150,
    },
    {
      title: "账单金额",
      search: false,
      dataIndex: "amount",
      width: 150,
      render: (text, record) => {
        return <span>{record.amount && formatAmount(record.amount)}</span>;
      },
    },
    {
      title: "跟进人",
      search: false,
      dataIndex: "flowUserName",
      width: 100,
    },
    {
      title: "租赁面积",
      search: false,
      dataIndex: "contractAreaAllSort",
      width: 100,
      render: (text, record) => {
        return <span>{record.contractAreaAll}</span>;
      },
    },
  ];
  return (
    <div
      style={{
        padding: "0 10px 10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <Button
          style={{
            color: "#0BBDFB",
            background: " #031224",
            boxShadow: "inset 0px 1px 13px 0px #1084ff",
            border: "none",
            marginRight: 20,
          }}
          onClick={() => gotoFinanceAnalysis("financeAnalysis")}
        >
          返回
        </Button>
        <div style={{ color: "#0BBDFB" }}>收入账单 &gt;</div>
      </div>
      <div
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          boxShadow: "inset 0px 1px 13px 0px #1084ff",
          padding: 24,
        }}
      >
        <div style={{ padding: 24, background: "#022952" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div style={{ color: "#0BFBD9", fontSize: 30, marginBottom: 5 }}>
                <span style={{ fontSize: 16, marginRight: 5 }}>¥</span>
                <span style={{ fontFamily: "Impact" }}>
                  {formatAmount(billStatistic?.receivableTotalAmount || 0)}
                </span>
              </div>
              <div style={{ color: "#0BBDFB", fontSize: 18 }}>应收含税</div>
            </div>
            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div style={{ color: "#0BC5FB", fontSize: 24, marginBottom: 10 }}>
                <span style={{ fontSize: 16, marginRight: 5 }}>¥</span>
                <span style={{ fontFamily: "Impact" }}>
                  {formatAmount(billStatistic?.adjustmentAmount || 0)}
                </span>
              </div>
              <div style={{ color: "#0B87FB", fontSize: 16 }}>调整</div>
            </div>

            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div style={{ color: "#0BC5FB", fontSize: 24, marginBottom: 10 }}>
                <span style={{ fontSize: 16, marginRight: 5 }}>¥</span>
                <span style={{ fontFamily: "Impact" }}>
                  {formatAmount(billStatistic?.incomeMount || 0)}
                </span>
              </div>
              <div style={{ color: "#0B87FB", fontSize: 16 }}>转入</div>
            </div>

            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div style={{ color: "#0BC5FB", fontSize: 24, marginBottom: 10 }}>
                <span style={{ fontSize: 16, marginRight: 5 }}>¥</span>
                <span style={{ fontFamily: "Impact" }}>
                  {formatAmount(billStatistic?.totalLateFee || 0)}
                </span>
              </div>
              <div style={{ color: "#0B87FB", fontSize: 16 }}>滞纳金</div>
            </div>

            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div style={{ color: "#0BC5FB", fontSize: 24, marginBottom: 10 }}>
                <span style={{ fontSize: 16, marginRight: 5 }}>¥</span>
                <span style={{ fontFamily: "Impact" }}>
                  {formatAmount(
                    billStatistic?.actualReceivableTotalAmount || 0
                  )}
                </span>
              </div>
              <div style={{ color: "#0B87FB", fontSize: 16 }}>实收</div>
            </div>
            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div style={{ color: "#0BC5FB", fontSize: 24, marginBottom: 10 }}>
                <span style={{ fontSize: 16, marginRight: 5 }}>¥</span>
                <span style={{ fontFamily: "Impact" }}>
                  {formatAmount(billStatistic?.needReceivableTotalAmount || 0)}
                </span>
              </div>
              <div style={{ color: "#0B87FB", fontSize: 16 }}>需收</div>
            </div>
            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div style={{ color: "#0BC5FB", fontSize: 24, marginBottom: 10 }}>
                <span style={{ fontSize: 16, marginRight: 5 }}>¥</span>
                <span style={{ fontFamily: "Impact" }}>
                  {formatAmount(
                    billStatistic?.needReceivableTotalTaxExclusiveAmount || 0
                  )}
                </span>
              </div>
              <div style={{ color: "#0B87FB", fontSize: 16 }}>应收不含税</div>
            </div>
            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div style={{ color: "#0BC5FB", fontSize: 24, marginBottom: 10 }}>
                <span style={{ fontSize: 16, marginRight: 5 }}>¥</span>
                <span style={{ fontFamily: "Impact" }}>
                  {formatAmount(
                    billStatistic?.needReceivableTotalTaxAmount || 0
                  )}
                </span>
              </div>
              <div style={{ color: "#0B87FB", fontSize: 16 }}>税额</div>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <Form
              layout="inline"
              form={formRef}
              className="cockpit_form cockpit_table"
            >
              <Form.Item label="账单编号" name="billNo">
                <Input
                  allowClear
                  style={{ width: 200 }}
                  placeholder="请输入"
                  onChange={useCallback(
                    debounce((value) => changeSearch(), 500),
                    []
                  )}
                />
              </Form.Item>
              <Form.Item label="甲方" name="firstPartId">
                <Select
                  allowClear
                  style={{ width: 200 }}
                  placeholder="请选择"
                  onChange={(e) => changeSearch()}
                  getPopupContainer={(node) => node.parentNode}
                >
                  {firstPartLists?.map((p) => (
                    <Select.Option key={p.id} value={p.id}>
                      {p.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="租客名称" name="tenantId">
                <Select
                  allowClear
                  style={{ width: 200 }}
                  placeholder="请选择"
                  onChange={(e) => changeSearch()}
                  getPopupContainer={(node) => node.parentNode}
                >
                  {tenantLists?.map((p) => (
                    <Select.Option key={p.id} value={p.id}>
                      {p.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="结清状态" name="status">
                <Select
                  style={{ width: 400 }}
                  placeholder="请选择"
                  getPopupContainer={(node) => node.parentNode}
                  mode="multiple"
                  allowClear
                  onChange={() => changeSearch()}
                >
                  <Select.Option value="1">待付款</Select.Option>
                  <Select.Option value="2">待退款</Select.Option>
                  <Select.Option value="3">已结清</Select.Option>
                  <Select.Option value="4">部分结清</Select.Option>
                  <Select.Option value="5">逾期未结清</Select.Option>
                  <Select.Option value="6">待收款</Select.Option>
                  <Select.Option value="7">关闭</Select.Option>
                  <Select.Option value="8">逾期已结清</Select.Option>
                  <Select.Option value="9">逾期部分结清</Select.Option>
                  <Select.Option value="10">未结清</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    boxShadow: "inset 0px 1px 13px 0px #1084ff",
                    background: "#03225F",
                    border: "none",
                    color: "#fff",
                  }}
                  onClick={() => resetSearch()}
                >
                  重置
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div
          className="cockpit_table scroll_table"
          style={{ height: "calc(100vh - 380px)", marginTop: 10 }}
        >
          <Table
            rowKey="id"
            columns={columns}
            dataSource={dataSource.financeBillVO}
            pagination={{
              size: "small",
              total: dataSource.totalCount,
              showTotal: (total, range) =>
                `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
              current: pageNum,
              pageSize: pageSize,
              onChange: changePage,
            }}
            scroll={{ x: 1500, y: "calc(100vh - 470px)" }}
          />

          {/* <ProTable
            columns={columns}
            actionRef={actionRef}
            scroll={{ x: 1500, y: 'calc(100vh - 490px)' }}
            request={async (params, sort, filter) => {
              const queryObj = {
                ...params,
                ...sort,
                ...filter,
                pageNum: params.current,
                type: 1,
                // ...filteredInfo,
              };
              delete queryObj.current;
              getIncomeBillStatistics(queryObj);
              const res = await getIncomeBillList(queryObj);
              if (res?.code === 0) {
                return {
                  data: res.data?.financeBillVO,
                  success: true,
                  total: res.data?.totalCount,
                };
              }
            }}
            rowKey="id"
            search={{
              labelWidth: 'auto',
              span: 4,
            }}
            options={false}
            tableAlertRender={false}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default FinanceList;
