var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseUiStart = /** @class */ (function (_super) {
    __extends(BaseUiStart, _super);
    function BaseUiStart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseUiStart.prototype.init = function () {
        var _this = this;
        Pan3d.Scene_data.fileRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/upfile/shadertree/";
        Pan3d.Scene_data.fileuiRoot = "res/";
        ModuleList.startup(); //启动所有模块
        Pan3d.UIData.Scale = 1;
        Pan3d.GameMouseManager.getInstance().addMouseEvent();
        Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.SHOW_FOLDER_PANEL));
        Pan3d.UIData.resize = function () { _this.resize(); }; //更尺寸变化
    };
    BaseUiStart.prototype.resize = function () {
        Pan3d.UIData.Scale = 1;
    };
    return BaseUiStart;
}(Pan3d.GameStart));
//# sourceMappingURL=BaseUiStart.js.map