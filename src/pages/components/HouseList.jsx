import { Button, Form, Select, Input, Table, Tooltip } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatAmount } from "@/utils/index";
import HouseLocationModal from "./HouseLocationModal";
import {
  firstPartList,
  tenantList,
  projectPageCount,
} from "@/services/cockpit";

import moment from "moment";

const projectType = {
  1: "商业",
  2: "住宅",
  3: "楼宇",
};

const HouseList = ({ backToHome }, ref) => {
  const [countInfo, setCountInfo] = useState({});
  const [projectList, setProjectList] = useState([]);
  const [firstPartLists, setFirstPartList] = useState([]);
  const [tenantLists, setTenantList] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const houseLocationRef = useRef();
  const tableRef = useRef();
  const [formRef] = Form.useForm();
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    // getCountInfo();
    // getProjectList();
    // getFirstPartList();
    // getTenantList();

    // formRef.setFieldsValue(globleParams);
    // getDataSource({ pageNum, pageSize });

    return () => {};
  }, []);

  // 项目列表
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

  const getDataSource = (param) => {
    const params = {
      ...formRef.getFieldsValue(),
      ...param,
      driveFlag: true,
      type: "",
    };
    houseList(params).then((res) => {
      if (res?.code === 0) {
        setDataSource(res?.data || {});
      }
    });
  };

  const changePage = (page, size) => {
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

  const getCountInfo = async () => {
    const res = await projectPageCount({ driveFlag: true });
    if (res?.code === 0) {
      setCountInfo(res.data || {});
    }
  };

  const showHouseLocation = (record) => {
    houseLocationRef.current.open(record);
  };

  const columns = [
    {
      title: "项目名称",
      dataIndex: "projectName",
      key: "projectName",
      width: 200,
      ellipsis: true,
      order: 4,
      renderFormItem: (_, { defaultRender }) => {
        return (
          <Form.Item name="projectName">
            <Select
              allowClear
              placeholder="请选择"
              // onChange={(e) => {
              //   setProjectName(e);
              // }}
            >
              {projectList?.map((p) => (
                <Select.Option key={p.id} value={p.id}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      },
    },

    {
      title: "楼栋",
      dataIndex: "buildingNumber",
      ellipsis: true,
      search: false,
    },
    {
      title: "楼层",
      dataIndex: "floor",
      ellipsis: true,
      search: false,
    },
    {
      title: "房号",
      dataIndex: "roomNumber",
      ellipsis: true,
      search: false,
    },
    {
      title: "甲方",
      dataIndex: "firstPartNameAlias",
      width: 200,
      ellipsis: true,
      render: (text, record) => (
        <Tooltip title={record.firstPartName}>
          <span>{record.firstPartNameAlias || record.firstPartName}</span>
        </Tooltip>
      ),
      order: 3,
      renderFormItem: (_, { defaultRender }) => {
        return (
          <Form.Item name="firstPartNameAlias">
            <Select
              allowClear
              placeholder="请选择"
              // onChange={(e) => {
              //   setProjectName(e);
              // }}
            >
              {firstPartLists?.map((p) => (
                <Select.Option key={p.id} value={p.id}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      },
    },
    {
      title: "计租面积",
      dataIndex: "contractAreaSort",
      ellipsis: true,
      render: (text, record) => {
        return <span>{record.area}</span>;
      },
      search: false,
    },

    {
      title: "状态",
      dataIndex: "statusSet",
      ellipsis: true,
      order: 1,
      valueType: "select",
      valueEnum: {
        0: {
          text: "空置",
        },
        3: {
          text: "已锁定",
        },
        4: {
          text: "在租",
        },
      },
      fieldProps: { mode: "multiple" },
    },
    {
      title: "实时单价",
      dataIndex: "onlinePrice",
      ellipsis: true,
      search: false,
    },
    {
      title: "租客名称",
      dataIndex: "tenantName",
      width: 200,
      ellipsis: true,
      order: 2,
      renderFormItem: (_, { defaultRender }) => {
        return (
          <Form.Item name="tenantName">
            <Select
              allowClear
              placeholder="请选择"
              // onChange={(e) => {
              //   setProjectName(e);
              // }}
            >
              {tenantLists?.map((p) => (
                <Select.Option key={p.id} value={p.id}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      },
    },
    {
      title: "租赁起",
      dataIndex: "leaseStartDateSort",
      render: (text, record) => (
        <span>
          {record.leaseStartDate &&
            moment(record.leaseStartDate).format("YYYY-MM-DD")}
        </span>
      ),
      search: false,
    },
    {
      title: "租赁止",
      dataIndex: "leaseEndDate",
      render: (text, record) => (
        <span>{record.leaseEndDate && moment(text).format("YYYY-MM-DD")}</span>
      ),
      search: false,
    },
    {
      title: "项目类型",
      dataIndex: "projectType",
      search: false,
      render: (text) => <span>{projectType[text]}</span>,
    },
    {
      title: "房源落位图",
      dataIndex: "remark",
      search: false,
      render: (text, record) => (
        <Button type="link" onClick={() => showHouseLocation(record)}>
          房源落位图
        </Button>
      ),
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
          onClick={() => backToHome("home")}
        >
          返回
        </Button>
        <div style={{ color: "#0BBDFB" }}>房源管理 &gt;</div>
      </div>
      <div
        style={{
          flex: 1,
          // width: "100%",
          height: "100%",
          boxShadow: "inset 0px 1px 13px 0px #1084ff",
          padding: 24,
        }}
      >
        <div style={{ padding: 24, background: "#022952" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div
                style={{
                  color: "#0BFBD9",
                  fontSize: 30,
                  marginBottom: 5,
                  fontFamily: "Impact",
                }}
              >
                <span>{formatAmount(countInfo?.totalBuildArea) || "-"}</span>
                <span style={{ fontSize: 16, marginLeft: 5 }}>m²</span>
              </div>
              <div style={{ color: "#0BBDFB", fontSize: 18 }}>总建筑面积</div>
            </div>
            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div
                style={{
                  color: "#0BC5FB",
                  fontSize: 24,
                  marginBottom: 10,
                  fontFamily: "Impact",
                }}
              >
                <span>{formatAmount(countInfo?.vacantArea) || "-"}</span>
                <span style={{ fontSize: 16, marginLeft: 5 }}>m²</span>
              </div>
              <div style={{ color: "#0B87FB", fontSize: 16 }}>空置面积</div>
            </div>

            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div
                style={{
                  color: "#0BC5FB",
                  fontSize: 24,
                  marginBottom: 10,
                  fontFamily: "Impact",
                }}
              >
                <span>{formatAmount(countInfo?.leasableArea) || "-"}</span>
                <span style={{ fontSize: 16, marginLeft: 5 }}>m²</span>
              </div>
              <div style={{ color: "#0B87FB", fontSize: 16 }}>可租赁面积</div>
            </div>

            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div
                style={{
                  color: "#0BC5FB",
                  fontSize: 24,
                  marginBottom: 10,
                  fontFamily: "Impact",
                }}
              >
                <span>{formatAmount(countInfo?.leasedArea) || "-"}</span>
                <span style={{ fontSize: 16, marginLeft: 5 }}>m²</span>
              </div>
              <div style={{ color: "#0B87FB", fontSize: 16 }}>已租面积</div>
            </div>

            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div
                style={{
                  color: "#0BC5FB",
                  fontSize: 24,
                  marginBottom: 10,
                  fontFamily: "Impact",
                }}
              >
                <span>{Math.round(countInfo?.occupancyRate * 100 || 0)}</span>
                <span style={{ fontSize: 16, marginLeft: 5 }}>%</span>
              </div>
              <div style={{ color: "#0B87FB", fontSize: 16 }}>出租率</div>
            </div>
            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div
                style={{
                  color: "#0BC5FB",
                  fontSize: 24,
                  marginBottom: 10,
                  fontFamily: "Impact",
                }}
              >
                <span>
                  {Math.round(countInfo?.rentalCompletionRate * 100 || 0)}
                </span>
                <span style={{ fontSize: 16, marginLeft: 5 }}>%</span>
              </div>
              <div style={{ color: "#0B87FB", fontSize: 16 }}>租金完成率</div>
            </div>
            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div
                style={{
                  color: "#0BC5FB",
                  fontSize: 24,
                  marginBottom: 10,
                  fontFamily: "Impact",
                }}
              >
                <span>{Math.round(countInfo?.collectionRate * 100 || 0)}</span>
                <span style={{ fontSize: 16, marginLeft: 5 }}>%</span>
              </div>
              <div style={{ color: "#0B87FB", fontSize: 16 }}>收缴率</div>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <Form
              layout="inline"
              form={formRef}
              className="cockpit_form cockpit_table"
            >
              <Form.Item label="项目名称" name="projectId">
                <Select
                  allowClear
                  style={{ width: 200 }}
                  placeholder="请选择"
                  onChange={(e) => changeSearch()}
                  getPopupContainer={(node) => node.parentNode}
                >
                  {projectList?.map((p) => (
                    <Select.Option key={p.id} value={p.id}>
                      {p.name}
                    </Select.Option>
                  ))}
                </Select>
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
              <Form.Item label="状态" name="statusSet">
                <Select
                  style={{ width: 300 }}
                  placeholder="请选择"
                  getPopupContainer={(node) => node.parentNode}
                  mode="multiple"
                  allowClear
                  onChange={(e) => changeSearch()}
                >
                  <Select.Option value="0">空置</Select.Option>
                  <Select.Option value="3">已锁定</Select.Option>
                  <Select.Option value="4">在租</Select.Option>
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
          className="cockpit_table"
          style={{ height: "calc(100vh - 380px)", marginTop: 10 }}
        >
          <Table
            rowKey="id"
            columns={columns}
            dataSource={dataSource.list}
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
            rowKey="id"
            actionRef={tableRef}
            search={{ labelWidth: 'auto', span: 4 }}
            tableAlertRender={false}
            columns={columns}
            onSubmit={(params) => {
              console.log(111, params);
              tableRef.current.reloadAndRest();
            }}
            request={async (params, sort, filter) => {
              console.log(222, params);
              const queryObj = {
                ...params,
                ...sort,
                ...filter,
                pageNum: params.current,
                driveFlag: true,
                type: '',
              };
              delete queryObj.current;
              const res = await houseList(queryObj);
              if (res?.code === 0) {
                return {
                  data: res.data.list,
                  success: true,
                  total: res.data.totalCount,
                };
              }
            }}
            options={false}
            scroll={{ x: 1500, y: 'calc(100vh - 515px)' }}
          /> */}
        </div>
      </div>

      <HouseLocationModal ref={houseLocationRef} />
    </div>
  );
};

export default HouseList;
