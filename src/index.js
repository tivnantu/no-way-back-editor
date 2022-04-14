import "@wangeditor/editor/dist/css/style.css";
import { createEditor, createToolbar } from "@wangeditor/editor";

const editorHolder = document.getElementById("my-editor");

let toolbarContainer = document.createElement("div");
toolbarContainer.id = "toolbar-container";
let editorContainer = document.createElement("div");
editorContainer.id = "editor-container";

editorHolder.appendChild(toolbarContainer);
editorHolder.appendChild(editorContainer);

const editorConfig = {};
editorConfig.placeholder = "10秒不写字就🈚了";
editorConfig.onChange = (editor) => {
  // 当编辑器选区、内容变化时，即触发
  // console.log('content', editor.children)
  // console.log(editor.getText())
  cleanHandler();
};

// 创建编辑器
const editor = createEditor({
  selector: "#editor-container",
  config: editorConfig,
  mode: "default",
});
// 创建工具栏
const toolbar = createToolbar({
  editor,
  selector: "#toolbar-container",
  mode: "default",
});

function cleanAll() {
  editor.clear();
  alert("🈚了！");
}

//防抖函数
function debounce(fun, delay) {
  return function (args) {
    //获取函数的作用域和变量
    let that = this;
    let _args = args;
    //每次事件被触发，都会清除当前的timeer，然后重写设置超时调用
    clearTimeout(fun.id);
    fun.id = setTimeout(function () {
      fun.call(that, _args);
    }, delay);
  };
}

let cleanHandler = debounce(cleanAll, 10000);
