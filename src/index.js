import "@wangeditor/editor/dist/css/style.css";
import { createEditor, createToolbar } from "@wangeditor/editor";



const editorConfig = {
  placeholder: '停止输入内容超过 10 秒钟会自动清空所有内容……',
      scroll: false, // 禁止编辑器滚动
  MENU_CONF: {
    uploadImage: {
      fieldName: 'your-fileName',
      base64LimitSize: 10 * 1024 * 1024 // 10M 以下插入 base64
    }
  },
  onChange(editor) {
    cleanHandler();
  }
}

// 创建编辑器
const editor = createEditor({
  selector: "#editor-text-area",
  config: editorConfig,
  content: []
});
// 创建工具栏
const toolbar = createToolbar({
  editor,
  selector: "#editor-toolbar",
  config: {
    excludeKeys: 'fullScreen',
  }
});

// 点击空白处 focus 编辑器
document.getElementById('editor-text-area').addEventListener('click', e => {
  if (e.target.id === 'editor-text-area') {
    editor.blur()
    editor.focus(true) // focus 到末尾
  }
})

function cleanAll() {
  editor.clear();
  alert("时间都去哪了？");
}

//防抖函数
function debounce(fun, delay) {
  return function (args) {
    //获取函数的作用域和变量
    let that = this;
    let _args = args;
    //每次事件被触发，都会清除当前的 timeer，然后重写设置超时调用
    clearTimeout(fun.id);
    fun.id = setTimeout(function () {
      fun.call(that, _args);
    }, delay);
  };
}

let cleanHandler = debounce(cleanAll, 10000);
