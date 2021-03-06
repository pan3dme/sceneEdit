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
var win;
(function (win) {
    var Panel = /** @class */ (function (_super) {
        __extends(Panel, _super);
        function Panel(has) {
            if (has === void 0) { has = true; }
            var _this = _super.call(this) || this;
            _this.layer = 0;
            if (has) {
                _this.winBg = new win.LayoutbaseBg();
                _this.addUIContainer(_this.winBg);
                _this.changeSize();
            }
            return _this;
        }
        Panel.prototype.setShowUi = function (value) {
            this.winBg.setShowUi(value);
        };
        Panel.prototype.changeSize = function () {
            if (this.winBg) {
                this.winBg.setRect(this.rect);
            }
        };
        return Panel;
    }(win.Sprite));
    win.Panel = Panel;
})(win || (win = {}));
//# sourceMappingURL=Panel.js.map