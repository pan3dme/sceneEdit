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
            var _this = _super.call(this, has) || this;
            if (_this.winBg) {
                //只保留远离的Tittle
                _this.winBg.setHideUi([
                    "a_bg",
                    "a_rigth_line",
                    "a_left_line",
                    "a_bottom_line",
                    "b_bottom_left",
                    "b_bottom_line_left",
                    "b_bottom_mid",
                    "b_bottom_line_right",
                    "b_bottom_right"
                ]);
            }
            return _this;
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
                console.log("添加", this._containerList.length);
            }
            else {
                console.log("清理主UI");
            }
        };
        CentenPanel.prototype.removeUIContainer = function ($container) {
            _super.prototype.removeUIContainer.call(this, $container);
            console.log("删除", this._containerList.length);
        };
        return CentenPanel;
    }(Panel));
    editscene.CentenPanel = CentenPanel;
    var EditScenePanel = /** @class */ (function (_super) {
        __extends(EditScenePanel, _super);
        function EditScenePanel() {
            var _this = _super.call(this, false) || this;
            _this.addCenten();
            _this.addRight();
            _this.addLeft();
            _this.addLeftMoveLine();
            _this.addRightMoveLine();
            _this.addBottomMoveLine();
            _this.resize();
            return _this;
        }
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
        EditScenePanel.prototype.addCenten = function () {
            var temp = new CentenPanel(true);
            temp.x = 600;
            temp.y = 0;
            temp.width = 450;
            temp.height = 10;
            this.addChild(temp);
            BaseUiStart.centenPanel = temp;
        };
        EditScenePanel.prototype.addRight = function () {
            var temp = new Panel(true);
            temp.x = 600;
            temp.y = 0;
            temp.width = 450;
            temp.height = 500;
            this.addChild(temp);
            BaseUiStart.rightPanel = temp;
        };
        EditScenePanel.prototype.addLeft = function () {
            var temp = new Panel(false);
            temp.x = 0;
            temp.y = 0;
            temp.width = 450;
            temp.height = 500;
            this.addChild(temp);
            BaseUiStart.leftPanel = temp;
        };
        EditScenePanel.prototype.resize = function () {
            BaseUiStart.leftPanel.height = this.bottomMoveLine.y;
            BaseUiStart.leftPanel.width = this.leftMoveLine.x;
            BaseUiStart.rightPanel.height = Scene_data.stageHeight;
            this.leftMoveLine.x = BaseUiStart.leftPanel.width;
            this.leftMoveLine.height = BaseUiStart.leftPanel.height;
            this.rightMoveLine.height = Scene_data.stageHeight;
            BaseUiStart.rightPanel.width = Scene_data.stageWidth - this.rightMoveLine.x - 10;
            BaseUiStart.rightPanel.x = Scene_data.stageWidth - BaseUiStart.rightPanel.width;
            this.bottomMoveLine.width = BaseUiStart.rightPanel.x - 10;
            this.bottomMoveLine.x = 0;
            BaseUiStart.centenPanel.x = BaseUiStart.leftPanel.width;
            BaseUiStart.centenPanel.height = BaseUiStart.leftPanel.height;
            BaseUiStart.centenPanel.width = BaseUiStart.rightPanel.x - BaseUiStart.centenPanel.x;
            BaseUiStart.centenPanel.resize();
            BaseUiStart.rightPanel.resize();
            _super.prototype.resize.call(this);
            var rect = new Rectangle(0, this.bottomMoveLine.y + 15, this.bottomMoveLine.width, Scene_data.stageHeight - this.bottomMoveLine.y - 15);
            Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.EDITSCENE_RESET_SIZE), rect);
            Pan3d.ModuleEventManager.dispatchEvent(new editscene.EditSceneEvent(editscene.EditSceneEvent.EDITE_SCENE_RESIZE), rect);
        };
        return EditScenePanel;
    }(Panel));
    editscene.EditScenePanel = EditScenePanel;
})(editscene || (editscene = {}));
//# sourceMappingURL=EditScenePanel.js.map