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
var layout;
(function (layout) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Rectangle = Pan3d.Rectangle;
    var UIConatiner = Pan3d.UIConatiner;
    var UIAtlas = Pan3d.UIAtlas;
    var Scene_data = Pan3d.Scene_data;
    var LayoutbaseBg = /** @class */ (function (_super) {
        __extends(LayoutbaseBg, _super);
        function LayoutbaseBg() {
            var _this = _super.call(this) || this;
            _this.left = 0;
            _this._pageRect = new Rectangle(0, 0, 300, 300);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._bottomRender.uiAtlas = new UIAtlas();
            _this._bottomRender.uiAtlas.setInfo("ui/basewin/basewin.txt", "ui/basewin/basewin.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        LayoutbaseBg.prototype.mouseDown = function (evt) {
            this.mouseIsDown = true;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        };
        LayoutbaseBg.prototype.stageMouseMove = function (evt) {
            this.mouseIsDown = false;
        };
        LayoutbaseBg.prototype.mouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        };
        LayoutbaseBg.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas;
            this.a_win_tittle = this.addEvntBut("a_win_tittle", this._topRender);
            this.a_bg = this.addEvntBut("a_bg", this._bottomRender);
            this.loadFinish = true;
            this.refrishSize();
        };
        LayoutbaseBg.prototype.butClik = function (evt) {
            console.log(evt.target);
        };
        Object.defineProperty(LayoutbaseBg.prototype, "pageRect", {
            get: function () {
                return this._pageRect;
            },
            set: function (value) {
                this._pageRect = value;
                if (this.loadFinish) {
                    this.refrishSize();
                }
            },
            enumerable: true,
            configurable: true
        });
        LayoutbaseBg.prototype.refrishSize = function () {
            this.left = this._pageRect.x;
            this.top = this._pageRect.y;
            this._pageRect.width = Math.max(100, this._pageRect.width);
            this._pageRect.height = Math.max(100, this._pageRect.height);
            this.a_win_tittle.x = 0;
            this.a_win_tittle.y = 0;
            this.a_win_tittle.width = this._pageRect.width;
            this.a_bg.x = 0;
            this.a_bg.y = 0;
            this.a_bg.width = this._pageRect.width;
            this.a_bg.height = this._pageRect.height;
            this._topRender.applyObjData();
            this.resize();
        };
        return LayoutbaseBg;
    }(UIConatiner));
    layout.LayoutbaseBg = LayoutbaseBg;
})(layout || (layout = {}));
//# sourceMappingURL=LayoutbaseBg.js.map