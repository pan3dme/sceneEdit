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
var materialui;
(function (materialui) {
    var TextureManager = Pan3d.me.TextureManager;
    var Scene_data = Pan3d.me.Scene_data;
    var LoadManager = Pan3d.me.LoadManager;
    var UIManager = Pan3d.me.UIManager;
    var Texture3DNodeUI = /** @class */ (function (_super) {
        __extends(Texture3DNodeUI, _super);
        function Texture3DNodeUI() {
            var _this = _super.call(this) || this;
            _this.name = "TextureSampleNodeUI" + random(9999999);
            _this.left = 400;
            _this.top = 100;
            _this._wrap = 0;
            _this._mipmap = 0;
            _this._filter = 0;
            _this._permul = false;
            _this.nodeTree = new materialui.NodeTreeTex;
            _this.nodeTree.ui = _this;
            _this.nodeTree.type = materialui.NodeTree.TEX3D;
            _this.width = 162;
            _this.height = 140;
            _this.initItem();
            _this.resetBgSize();
            _this.drawTitleToFrame("3D纹理");
            _this.a_texture_pic_frame = _this.getTexturePicUi();
            _this.a_texture_pic_frame.x = 20;
            _this.a_texture_pic_frame.y = 55;
            return _this;
        }
        Texture3DNodeUI.prototype.drawTextureUrlToFrame = function ($ui, $img) {
            var $toRect = $ui.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
            $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
        };
        Texture3DNodeUI.prototype.getTexturePicUi = function () {
            var $ui = this.addEvntBut("a_texture_pic_frame", this._topRender);
            $ui.goToAndStop(materialui.TextureSampleNodeUI.texture_pic_frame_ID++);
            return $ui;
        };
        Texture3DNodeUI.prototype.initItem = function () {
            this.uvItem = new materialui.ItemMaterialUI("UV", materialui.MaterialItemType.VEC3);
            this.rgbItem = new materialui.ItemMaterialUI("rgb", materialui.MaterialItemType.VEC3, false);
            this.addItems(this.uvItem);
            this.addItems(this.rgbItem);
        };
        Texture3DNodeUI.prototype.creatBase = function ($url) {
            var vo = this.nodeTree;
            vo.url = $url;
            vo.wrap = this._wrap;
            vo.mipmap = this._mipmap;
            vo.filter = this._filter;
            vo.permul = this._permul;
            this.drawPicBmp();
        };
        Texture3DNodeUI.prototype.drawPicBmp = function () {
            var _this = this;
            var $url = this.nodeTree.url;
            var $img = TextureManager.getInstance().getImgResByurl(Scene_data.fileRoot + $url);
            if ($img) {
                this.drawTextureUrlToFrame(this.a_texture_pic_frame, $img);
            }
            else {
                LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.IMG_TYPE, function ($img) {
                    _this.drawTextureUrlToFrame(_this.a_texture_pic_frame, $img);
                });
            }
        };
        Texture3DNodeUI.prototype.setData = function (obj) {
            _super.prototype.setData.call(this, obj);
            obj.url = String(obj.url).replace(Scene_data.fileRoot, ""); //兼容原来相对路径
            this.nodeTree.url = obj.url;
            this.isMain = obj.isMain;
            this.wrap = obj.wrap;
            this.mipmap = obj.mipmap;
            this.filter = obj.filter;
            this.permul = obj.permul;
            this.drawPicBmp();
            this.showDynamic();
        };
        Texture3DNodeUI.prototype.getData = function () {
            var obj = _super.prototype.getData.call(this);
            obj.url = this.nodeTree.url;
            obj.isMain = this.isMain;
            obj.wrap = this.wrap;
            obj.mipmap = this.mipmap;
            obj.filter = this.filter;
            obj.permul = this.permul;
            return obj;
        };
        Object.defineProperty(Texture3DNodeUI.prototype, "wrap", {
            get: function () {
                return this._wrap;
            },
            set: function (value) {
                this._wrap = value;
                this.nodeTree.wrap = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture3DNodeUI.prototype, "mipmap", {
            get: function () {
                return this._mipmap;
            },
            set: function (value) {
                this._mipmap = value;
                this.nodeTree.mipmap = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture3DNodeUI.prototype, "filter", {
            get: function () {
                return this._filter;
            },
            set: function (value) {
                this._filter = value;
                this.nodeTree.filter = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture3DNodeUI.prototype, "permul", {
            get: function () {
                return this._permul;
            },
            set: function (value) {
                this._permul = value;
                this.nodeTree.permul = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture3DNodeUI.prototype, "isMain", {
            set: function (value) {
                this.nodeTree.isMain = value;
                if (value) {
                    //  _mainTxt.text = "M";
                }
                else {
                    //  _mainTxt.text = "";
                }
            },
            enumerable: true,
            configurable: true
        });
        Texture3DNodeUI.prototype.showDynamic = function () {
            if (this.nodeTree.isDynamic) {
                this.drawTitleToFrame("3d采样<" + this.nodeTree.paramName + ">");
            }
            else {
                this.drawTitleToFrame("3d采样");
            }
        };
        Texture3DNodeUI.texture_pic_frame_ID = 0;
        return Texture3DNodeUI;
    }(materialui.BaseMaterialNodeUI));
    materialui.Texture3DNodeUI = Texture3DNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=Texture3DNodeUI.js.map