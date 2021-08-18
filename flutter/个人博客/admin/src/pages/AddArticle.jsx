import React, { useState, useEffect } from "react";
import marked from "marked";
import "../static/css/AddArticle.css";
import "../static/css/comm.css";
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  DatePicker,
  message,
  Form,
} from "antd";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import axios from "axios";
import servicePath from "../config/apiUrl";
import moment from "moment";
const { Option } = Select;
const { TextArea } = Input;

export function AddArticle(props) {
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(moment().format("YYYY-MM-DD")); //发布日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(0); //选择的文章类别
  const [articleId,setArticleId] = useState(0)
  const [form] = Form.useForm();
  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });
  //改变文章内容
  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };
  //改变介绍
  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };
  // 获取文章类别信息
  const getTypeInfo = () => {
    axios({
      method: "get",
      url: servicePath.getTypeInfo,
      headers: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    }).then((res) => {
      if (res.data.data === "没有登录") {
        localStorage.removeItem("openId");
        props.history.push("/");
      }
      const result = res.data.data;
      if (result.length > 0) {
        setTypeInfo(result);
      }
    });
  };
  //选择类别后的便哈
  const selectTypeHandler = (value) => {
    setSelectType(value);
  };
  //保存文章
  const saveArticle = () => {
    if (!selectedType) {
      message.error("必须选择文章类别", 0.5);
      return false;
    } else if (!articleTitle) {
      message.error("文章名称不能为空", 0.5);
      return false;
    } else if (!articleContent) {
      message.error("文章内容不能为空", 0.5);
      return false;
    } else if (!introducemd) {
      message.error("简介不能为空", 0.5);
      return false;
    } else if (!showDate) {
      message.error("发布日期不能为空", 0.5);
      return false;
    }
    const dataProps = {};
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introducemd;
    const dataText = showDate.replace("-", "/");
    dataProps.addTime = new Date(dataText).getTime() / 1000;

    if (articleId === 0) {
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000;
      axios({
        method: "post",
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        console.log('这是新增')
        setArticleId(res.data.insertId)
        if (res.data.isScuccess) {
          message.success("文章保存成功", 1);
        } else {
          message.error("文章保存失败", 1);
        }
      });
    } else {
      dataProps.id = articleId;
      axios({
        method: "post",
        url: servicePath.updateArticle,
        header: { "Access-Control-Allow-Origin": "*" },
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        console.log('这是修改把');
        if (res.data.isScuccess) {
          message.success("文章保存成功");
        } else {
          message.error("保存失败");
        }
      });
    }
  };
  const getArticleById = (id) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      //let articleInfo= res.data.data[0]
      setArticleTitle(res.data.data[0].title);
      setArticleContent(res.data.data[0].article_content);
      let html = marked(res.data.data[0].article_content);
      setMarkdownContent(html);
      setIntroducemd(res.data.data[0].introduce);
      let tmpInt = marked(res.data.data[0].introduce);
      setIntroducehtml(tmpInt);
      setShowDate(res.data.data[0].addTime);
      setSelectType(res.data.data[0].typeId);
      form.setFieldsValue({
        articleType:res.data.data[0].typeName
      })
    });
  };
  useEffect(() => {
    getTypeInfo();
    let tmpId = props.match.params.id;
    if (tmpId) {
      setArticleId(tmpId);
      getArticleById(tmpId);
    }
  }, []);
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10} >
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
                size="large"
              />
            </Col>
            <Col span={4} style={{display:'flex',alignItems:'flex-start'}}>
              &nbsp;
              <Form  form={form} style={{width:120,alignItems:'flex-start'}}>
                <Form.Item name="articleType">
                  <Select
                    size="large"
                    onChange={selectTypeHandler}
                  >
                    {typeInfo.map((item, index) => {
                      return (
                        <Option key={index} value={item.Id}>
                          {item.typeName}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="文章内容"
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                value={introducemd}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
                placeholder="文章简介"
              />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{
                  __html: "文章简介：" + introducehtml,
                }}
              ></div>
              <br />
              <br />
              <div className="introduce-html"></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <div className="date-select">
                  <DatePicker
                    onChange={(date, dateString) => setShowDate(dateString)}
                    placeholder="发布日期"
                    size="large"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <button
        onClick={() => {
          console.log(articleId);
        }}
      >
        点击
      </button>
    </div>
  );
}
