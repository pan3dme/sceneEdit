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
var UIPanelEvent = /** @class */ (function (_super) {
    __extends(UIPanelEvent, _super);
    function UIPanelEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIPanelEvent.DISPOSE_PANEL_EVENT = "dispose_panel_event";
    return UIPanelEvent;
}(Pan3d.BaseEvent));
var UIPanel = /** @class */ (function (_super) {
    __extends(UIPanel, _super);
    function UIPanel() {
        return _super.call(this) || this;
    }
    UIPanel.prototype.onAdd = function () {
        if (this._disposeEventFun) {
            Pan3d.TimeUtil.removeTimeOut(this._disposeEventFun);
        }
    };
    UIPanel.prototype.onRemove = function () {
        var _this = this;
        if (!this._disposeEventFun) {
            this._disposeEventFun = function () {
                var evt = new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT);
                evt.panel = _this;
                Pan3d.ModuleEventManager.dispatchEvent(evt);
            };
        }
        Pan3d.TimeUtil.addTimeOut(20000000, this._disposeEventFun);
    };
    return UIPanel;
}(Pan3d.UIConatiner));
//# sourceMappingURL=UIPanel.js.map