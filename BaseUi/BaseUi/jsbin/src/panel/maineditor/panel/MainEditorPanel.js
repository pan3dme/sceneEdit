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
var maineditor;
(function (maineditor) {
    var Rectangle = Pan3d.me.Rectangle;
    var Vector2D = Pan3d.me.Vector2D;
    var TextureManager = Pan3d.me.TextureManager;
    var InteractiveEvent = Pan3d.me.InteractiveEvent;
    var ModuleEventManager = Pan3d.me.ModuleEventManager;
    var MouseType = Pan3d.me.MouseType;
    var MathUtil = Pan3d.me.MathUtil;
    var PanDragEvent = drag.PanDragEvent;
    var MainEditorPanel = /** @class */ (function (_super) {
        __extends(MainEditorPanel, _super);
        function MainEditorPanel() {
            var _this = _super.call(this) || this;
            _this.suffix = "prefab|lyf|zzw|skill";
            _this.pageRect = new Rectangle(0, 0, 500, 500);
            _this._sceneViewRender = new maineditor.UiModelViewRender();
            _this.addRender(_this._sceneViewRender);
            return _this;
        }
        Object.defineProperty(MainEditorPanel.prototype, "sceneProjectVo", {
            set: function (value) {
                this._sceneViewRender.sceneProjectVo = value;
            },
            enumerable: true,
            configurable: true
        });
        MainEditorPanel.prototype.loadConfigCom = function () {
            _super.prototype.loadConfigCom.call(this);
            this.initView();
            this.uiLoadComplete = true;
            this.refrishSize();
        };
        MainEditorPanel.prototype.initView = function () {
            var _this = this;
            this._sceneViewRender.uiAtlas = this._tRender.uiAtlas;
            this.a_scene_view = this.addChild(this._sceneViewRender.getComponent("a_scene_view"));
            TextureManager.getInstance().getTexture("res/white.jpg", function ($texture) {
                _this._sceneViewRender.textureRes = $texture;
                Pan3d.me.TimeUtil.addFrameTick(function (t) { _this.upFrame(t); });
            });
            this.a_scene_view.addEventListener(PanDragEvent.DRAG_DROP, this.dragDrop, this);
            this.a_scene_view.addEventListener(PanDragEvent.DRAG_ENTER, this.dragEnter, this);
            this.a_scene_view.addEventListener(InteractiveEvent.Down, this.butClik, this);
            document.addEventListener(MouseType.MouseWheel, function ($evt) { _this.onPanellMouseWheel($evt); });
        };
        MainEditorPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_scene_view:
                    if (evt.mouseEvent.ctrlKey || evt.mouseEvent.shiftKey) {
                        ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SCENE_SELECT_SPRITE_DOWN), evt);
                    }
                    break;
                default:
                    break;
            }
        };
        MainEditorPanel.prototype.onPanellMouseWheel = function ($evt) {
            var $slectUi = win.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y));
            if ($slectUi && $slectUi.parent == this) {
                var q = new Pan3d.me.Quaternion();
                q.fromMatrix(maineditor.MainEditorProcessor.edItorSceneManager.cam3D.cameraMatrix);
                var m = q.toMatrix3D();
                m.invert();
                var $add = m.transformVector(new Vector3D(0, 0, $evt.wheelDelta / 100));
                maineditor.MainEditorProcessor.edItorSceneManager.cam3D.x += $add.x;
                maineditor.MainEditorProcessor.edItorSceneManager.cam3D.y += $add.y;
                maineditor.MainEditorProcessor.edItorSceneManager.cam3D.z += $add.z;
                MathUtil.MathCam(maineditor.MainEditorProcessor.edItorSceneManager.cam3D);
            }
        };
        MainEditorPanel.prototype.dragDrop = function (evt) {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                console.log("可以拖动");
            }
            else {
                console.log("不可以");
            }
        };
        MainEditorPanel.prototype.testSuffix = function (value) {
            if (!this.suffix) {
                return;
            }
            var tempItem = this.suffix.split("|");
            for (var i = 0; i < tempItem.length; i++) {
                if (value.indexOf(tempItem[i]) != -1) {
                    return true;
                }
            }
            return false;
        };
        MainEditorPanel.prototype.dragEnter = function (evt) {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                var obj = {};
                obj.url = drag.DragManager.dragSource.url;
                obj.name = "新对象";
                obj.pos = maineditor.MainEditorProcessor.edItorSceneManager.getGroundPos(new Vector2D(evt.data.x, evt.data.y));
                if (drag.DragManager.dragSource.url.indexOf(".lyf") != -1) {
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INPUT_LYF_TO_SCENE), obj);
                }
                if (drag.DragManager.dragSource.url.indexOf(".skill") != -1) {
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INPUT_SKILL_TO_SCENE), obj);
                }
                if (drag.DragManager.dragSource.url.indexOf(".prefab") != -1) {
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INPUT_PREFAB_TO_SCENE), obj);
                }
                if (drag.DragManager.dragSource.url.indexOf(".zzw") != -1) {
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INPUT_ZZW_TO_SCENE), obj);
                }
            }
        };
        MainEditorPanel.prototype.upFrame = function (t) {
            if (this.hasStage) {
                maineditor.MainEditorProcessor.edItorSceneManager.textureRes = this._sceneViewRender.textureRes;
                var cam3D = maineditor.MainEditorProcessor.edItorSceneManager.cam3D;
                cam3D.cavanRect.x = this.a_scene_view.x + this.left;
                cam3D.cavanRect.y = this.a_scene_view.y + this.top;
                cam3D.cavanRect.width = this.a_scene_view.width;
                cam3D.cavanRect.height = this.a_scene_view.height;
                maineditor.MainEditorProcessor.edItorSceneManager.renderToTexture();
            }
        };
        MainEditorPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        MainEditorPanel.prototype.panelEventChanger = function (value) {
            this.setRect(value);
            this.refrishSize();
        };
        MainEditorPanel.prototype.refrishSize = function () {
            this.resize();
            if (this.uiLoadComplete) {
                var roundNum = 1;
                this.a_scene_view.x = roundNum;
                this.a_scene_view.y = roundNum;
                this.a_scene_view.width = this.pageRect.width - roundNum * 2;
                this.a_scene_view.height = this.pageRect.height - roundNum * 2;
            }
        };
        return MainEditorPanel;
    }(win.BaseWindow));
    maineditor.MainEditorPanel = MainEditorPanel;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=MainEditorPanel.js.map