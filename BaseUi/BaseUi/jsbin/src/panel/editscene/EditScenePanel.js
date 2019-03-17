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
var editscene;
(function (editscene) {
    var Panel = layout.Panel;
    var Rectangle = Pan3d.Rectangle;
    var Vector2D = Pan3d.Vector2D;
    var Scene_data = Pan3d.Scene_data;
    var LayoutbaseBg = layout.LayoutbaseBg;
    var CentenPanel = /** @class */ (function (_super) {
        __extends(CentenPanel, _super);
        function CentenPanel(has) {
            if (has === void 0) { has = true; }
            return _super.call(this, has) || this;
        }
        CentenPanel.prototype.changeSize = function () {
            if (this.winBg) {
                this.winBg.setRect(new Rectangle(this.rect.x, this.rect.y, this.rect.width, 300));
            }
        };
        CentenPanel.prototype.addUIContainer = function ($container) {
            //特殊处理，删除非底层背景
            for (var i = this._containerList.length - 1; i > 0; i--) {
                if (!(this._containerList[i] instanceof LayoutbaseBg)) {
                    this.removeUIContainer(this._containerList[i]);
                }
            }
            if ($container) {
                _super.prototype.addUIContainer.call(this, $container);
            }
        };
        CentenPanel.prototype.removeUIContainer = function ($container) {
            _super.prototype.removeUIContainer.call(this, $container);
        };
        return CentenPanel;
    }(Panel));
    editscene.CentenPanel = CentenPanel;
    var EditScenePanel = /** @class */ (function (_super) {
        __extends(EditScenePanel, _super);
        function EditScenePanel() {
            var _this = _super.call(this, false) || this;
            _this.menuHeight = 22;
            _this.addCenten();
            _this.addRight();
            _this.addLeft();
            _this.addSceneLaoutLinePane();
            _this.addTop();
            _this.resize();
            return _this;
        }
        EditScenePanel.prototype.showofHide = function (panel) {
            if (panel.ishide) {
                switch (panel) {
                    case BaseUiStart.leftPanel:
                        this.leftMoveLine.x = panel.width + 3;
                        break;
                    case BaseUiStart.rightPanel:
                        this.rightMoveLine.x = Scene_data.stageWidth - panel.width;
                        break;
                }
            }
            panel.ishide = !panel.ishide;
        };
        EditScenePanel.prototype.addBottomMoveLine = function () {
            this.bottomMoveLine = new editscene.EditSceneLineVertical;
            this.bottomMoveLine.y = Scene_data.stageHeight * 0.7;
            this.bottomMoveLine.roundPos = new Vector2D(0.5, 0.80);
            this.addChild(this.bottomMoveLine);
        };
        EditScenePanel.prototype.addLeftMoveLine = function () {
            this.leftMoveLine = new editscene.EditSceneLine;
            this.leftMoveLine.x = Math.min(Scene_data.stageWidth * 0.20, 250);
            this.leftMoveLine.roundPos = new Vector2D(0.15, 0.45);
            this.addChild(this.leftMoveLine);
        };
        EditScenePanel.prototype.addRightMoveLine = function () {
            this.rightMoveLine = new editscene.EditSceneLine;
            this.rightMoveLine.x = Math.max(Scene_data.stageWidth * 0.80, Scene_data.stageWidth - 250);
            this.rightMoveLine.roundPos = new Vector2D(0.55, 0.85);
            this.addChild(this.rightMoveLine);
        };
        EditScenePanel.prototype.addSceneLaoutLinePane = function () {
            this._sceneLaoutLinePane = new editscene.SceneLaoutLinePane;
            this._sceneLaoutLinePane.x = 0;
            this._sceneLaoutLinePane.y = 0;
            this.addChild(this._sceneLaoutLinePane);
        };
        EditScenePanel.prototype.addCenten = function () {
            var temp = new CentenPanel(true);
            //  temp.setShowUi(["c_win_bg"]);
            temp.x = 600;
            temp.y = 0;
            temp.width = 450;
            temp.height = 10;
            this.addChild(temp);
            BaseUiStart.centenPanel = temp;
        };
        EditScenePanel.prototype.addRight = function () {
            var temp = new Panel(true);
            temp.setShowUi(["c_left_line", "c_win_bg"]);
            temp.x = 600;
            temp.y = 0;
            temp.width = 450;
            temp.height = 500;
            this.addChild(temp);
            BaseUiStart.rightPanel = temp;
        };
        EditScenePanel.prototype.addTop = function () {
            var tempPanel = new Panel(false);
            tempPanel.x = 0;
            tempPanel.y = 0;
            tempPanel.width = 450;
            tempPanel.height = 30;
            this.addChild(tempPanel);
            BaseUiStart.topPanel = tempPanel;
        };
        EditScenePanel.prototype.addLeft = function () {
            var temp = new Panel(true);
            temp.setShowUi(["c_right_line", "c_win_bg"]);
            temp.x = 0;
            temp.y = 50;
            temp.width = 450;
            temp.height = 500;
            this.addChild(temp);
            BaseUiStart.leftPanel = temp;
        };
        return EditScenePanel;
    }(Panel));
    editscene.EditScenePanel = EditScenePanel;
})(editscene || (editscene = {}));
//# sourceMappingURL=EditScenePanel.js.map