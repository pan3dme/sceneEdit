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
var basemove;
(function (basemove) {
    var UIRenderComponent = Pan3d.me.UIRenderComponent;
    var InteractiveEvent = Pan3d.me.InteractiveEvent;
    var Rectangle = Pan3d.me.Rectangle;
    var UIManager = Pan3d.me.UIManager;
    var UIConatiner = Pan3d.me.UIConatiner;
    var UIMask = Pan3d.me.UIMask;
    var UIData = Pan3d.me.UIData;
    var UIAtlas = Pan3d.me.UIAtlas;
    var Vector2D = Pan3d.me.Vector2D;
    var TextureManager = Pan3d.me.TextureManager;
    var Scene_data = Pan3d.me.Scene_data;
    var BaseMoveWindos = /** @class */ (function (_super) {
        __extends(BaseMoveWindos, _super);
        function BaseMoveWindos($rect, $move) {
            if ($rect === void 0) { $rect = null; }
            if ($move === void 0) { $move = true; }
            var _this = _super.call(this) || this;
            if ($rect) {
                _this.pageRect = $rect;
            }
            else {
                _this.pageRect = new Rectangle(100, 100, 500, 500);
            }
            _this.contentHeight = 0;
            _this.useMoseMove = $move;
            _this._bRender = new UIRenderComponent;
            _this.addRender(_this._bRender);
            _this._mRender = new UIRenderComponent;
            _this.addRender(_this._mRender);
            _this._tRender = new UIRenderComponent;
            _this.addRender(_this._tRender);
            _this._closeRender = new UIRenderComponent;
            _this.addRender(_this._closeRender);
            _this._bRender.uiAtlas = new UIAtlas();
            _this._bRender.uiAtlas.setInfo("ui/window/window.txt", "ui/window/window.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        BaseMoveWindos.prototype.mouseDown = function (evt) {
            this.mouseIsDown = true;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        };
        BaseMoveWindos.prototype.stageMouseMove = function (evt) {
            this.mouseIsDown = false;
        };
        BaseMoveWindos.prototype.mouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        };
        BaseMoveWindos.prototype.loadConfigCom = function () {
            this._tRender.uiAtlas = this._bRender.uiAtlas;
            this._mRender.uiAtlas = this._bRender.uiAtlas;
            this._closeRender.uiAtlas = this._bRender.uiAtlas;
            this._uiMask = new UIMask();
            this._uiMask.level = win.BaseWindow.maskLevel++;
            this.addMask(this._uiMask);
            this.a_bg = this.addEvntBut("b_win_bg", this._bRender);
            this.a_tittle_bg = this.addChild(this._tRender.getComponent("b_tittle_bg"));
            this.a_left_line = this.addChild(this._tRender.getComponent("a_left_line"));
            this.a_rigth_line = this.addChild(this._tRender.getComponent("a_rigth_line"));
            this.a_bottom_line = this.addChild(this._tRender.getComponent("a_bottom_line"));
            this.a_scroll_bar_bg = this.addChild(this._mRender.getComponent("a_scroll_bar_bg"));
            this.a_scroll_bar = this.addChild(this._tRender.getComponent("a_scroll_bar"));
            this.b_bottom_left = this.addChild(this._tRender.getComponent("b_bottom_left"));
            this.b_bottom_mid = this.addChild(this._tRender.getComponent("b_bottom_mid"));
            this.b_bottom_right = this.addChild(this._tRender.getComponent("b_bottom_right"));
            this.b_bottom_line_left = this.addChild(this._tRender.getComponent("b_bottom_line"));
            this.b_bottom_line_right = this.addChild(this._tRender.getComponent("b_bottom_line"));
            this.b_win_close = this.addEvntBut("b_win_close", this._closeRender);
            this.setUiListVisibleByItem([this.a_left_line], false);
            this.setUiListVisibleByItem([this.a_rigth_line], false);
            this.setUiListVisibleByItem([this.a_bottom_line], false);
            this.setUiListVisibleByItem([this.b_win_close], false);
            if (this.useMoseMove) {
                this.a_rigth_line.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
                this.a_bottom_line.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
                this.a_scroll_bar.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
                this.a_tittle_bg.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            }
            this.a_scroll_bar.y = this.a_tittle_bg.height + 2;
            this.uiLoadComplete = true;
            this.setHideUi();
            this.resize();
        };
        BaseMoveWindos.prototype.removeMoveEvent = function () {
            if (this.uiLoadComplete) {
                this.a_tittle_bg.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
                this.a_rigth_line.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
                this.a_bottom_line.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            }
        };
        BaseMoveWindos.prototype.setRect = function (value) {
            this.pageRect = value;
            this.resize();
        };
        BaseMoveWindos.prototype.setHideUi = function (value) {
            if (value === void 0) { value = null; }
            if (value) {
                this.hideUiItem = value;
            }
            if (this.uiLoadComplete) {
                for (var i = 0; this.hideUiItem && i < this.hideUiItem.length; i++) {
                    var uiName = this.hideUiItem[i];
                    this.setUiListVisibleByItem([this[uiName]], false);
                }
            }
        };
        BaseMoveWindos.prototype.resize = function () {
            if (this.uiLoadComplete) {
                this.left = this.pageRect.x;
                this.top = this.pageRect.y;
                this.pageRect.width = Math.max(100, this.pageRect.width);
                this.pageRect.height = Math.max(100, this.pageRect.height);
                this.a_tittle_bg.x = 2;
                this.a_tittle_bg.y = 2;
                this.a_tittle_bg.width = this.pageRect.width - 4;
                this.b_win_close.y = 2;
                this.b_win_close.x = this.pageRect.width - this.b_win_close.width - 5;
                this._uiMask.y = this.a_tittle_bg.height + 2;
                this._uiMask.x = 0;
                this._uiMask.width = this.pageRect.width - this.a_rigth_line.width;
                this._uiMask.height = this.pageRect.height - this.a_tittle_bg.height - this.a_bottom_line.height;
                this.a_bg.x = 0;
                this.a_bg.y = 0;
                this.a_bg.width = this.pageRect.width;
                this.a_bg.height = this.pageRect.height;
                this.a_rigth_line.x = this.pageRect.width - this.a_rigth_line.width;
                this.a_rigth_line.y = this.a_tittle_bg.height - 1;
                this.a_rigth_line.height = this.pageRect.height - this.a_tittle_bg.height;
                this.a_left_line.x = 0;
                this.a_left_line.y = this.a_rigth_line.y;
                this.a_left_line.height = this.a_rigth_line.height;
                this.a_bottom_line.x = 0;
                this.a_bottom_line.y = this.pageRect.height - this.a_bottom_line.height;
                this.a_bottom_line.width = this.a_bg.width;
                this.a_scroll_bar.x = this._uiMask.x + this._uiMask.width - this.a_scroll_bar.width;
                this.a_scroll_bar_bg.x = this.pageRect.width - this.a_rigth_line.width - this.a_scroll_bar_bg.width + 2;
                this.a_scroll_bar_bg.y = this.a_tittle_bg.height;
                this.a_scroll_bar_bg.height = this.a_left_line.height;
                this.setUiListVisibleByItem([this.a_scroll_bar], this.contentHeight > this._uiMask.height);
                if (this.contentHeight > this._uiMask.height) {
                    this.a_scroll_bar.height = this._uiMask.height * (this._uiMask.height / this.contentHeight);
                    this.a_scroll_bar.y = Math.min((this._uiMask.y + this._uiMask.height) - this.a_scroll_bar.height, this.a_scroll_bar.y);
                }
                else {
                    //  this.a_scroll_bar.y = this.a_tittle_bg.height;
                }
                this.b_bottom_left.x = 0;
                this.b_bottom_left.y = this.pageRect.height - this.b_bottom_left.height;
                this.b_bottom_mid.y = this.b_bottom_left.y;
                this.b_bottom_mid.x = this.pageRect.width / 2 - this.b_bottom_mid.width / 2;
                this.b_bottom_right.y = this.b_bottom_left.y;
                this.b_bottom_right.x = this.pageRect.width - this.b_bottom_right.width;
                this.b_bottom_line_left.y = this.b_bottom_left.y;
                this.b_bottom_line_left.x = this.b_bottom_left.x + this.b_bottom_left.width;
                this.b_bottom_line_left.width = this.b_bottom_mid.x - this.b_bottom_left.width;
                this.b_bottom_line_right.y = this.b_bottom_left.y;
                this.b_bottom_line_right.x = this.b_bottom_mid.x + this.b_bottom_mid.width;
                this.b_bottom_line_right.width = this.b_bottom_right.x - this.b_bottom_mid.width - this.b_bottom_mid.x;
                this._bRender.applyObjData();
                this._mRender.applyObjData();
                this._tRender.applyObjData();
            }
            _super.prototype.resize.call(this);
        };
        BaseMoveWindos.prototype.tittleMouseDown = function (evt) {
            this.mouseMoveTaget = evt.target;
            this.lastMousePos = new Vector2D(evt.x, evt.y);
            switch (this.mouseMoveTaget) {
                case this.a_tittle_bg:
                    this.lastPagePos = new Vector2D(this.left, this.top);
                    break;
                case this.a_rigth_line:
                case this.a_bottom_line:
                    this.lastPagePos = new Vector2D(this.pageRect.width, this.pageRect.height);
                    break;
                case this.a_scroll_bar:
                    this.lastPagePos = new Vector2D(0, this.a_scroll_bar.y);
                    break;
                default:
                    console.log("nonono");
                    break;
            }
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        };
        BaseMoveWindos.prototype.tittleMouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        };
        BaseMoveWindos.prototype.mouseOnTittleMove = function (evt) {
            switch (this.mouseMoveTaget) {
                case this.a_tittle_bg:
                    this.left = this.lastPagePos.x + (evt.x - this.lastMousePos.x);
                    this.top = this.lastPagePos.y + (evt.y - this.lastMousePos.y);
                    this.pageRect.x = this.left;
                    this.pageRect.y = this.top;
                    break;
                case this.a_rigth_line:
                    this.pageRect.width = this.lastPagePos.x + (evt.x - this.lastMousePos.x);
                    break;
                case this.a_bottom_line:
                    this.pageRect.height = this.lastPagePos.y + (evt.y - this.lastMousePos.y);
                    break;
                case this.a_scroll_bar:
                    this.a_scroll_bar.y = this.lastPagePos.y + (evt.y - this.lastMousePos.y);
                    this.a_scroll_bar.y = Math.max(this.a_scroll_bar.y, this._uiMask.y);
                    this.a_scroll_bar.y = Math.min(this.a_scroll_bar.y, this._uiMask.y + this._uiMask.height - this.a_scroll_bar.height);
                    //  console.log(this.a_scroll_bar.y)
                    this.changeScrollBar();
                    break;
                default:
                    console.log("nonono");
                    break;
            }
            this.resize();
        };
        BaseMoveWindos.prototype.changeScrollBar = function () {
        };
        BaseMoveWindos.maskLevel = 10;
        return BaseMoveWindos;
    }(UIConatiner));
    basemove.BaseMoveWindos = BaseMoveWindos;
    var Dis2dBaseWindow = /** @class */ (function (_super) {
        __extends(Dis2dBaseWindow, _super);
        function Dis2dBaseWindow($classVo, $rect, $num) {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.creatBaseRender();
            _this.addRender(_this._baseRender);
            _this.mathSize($rect, $num);
            _this.initData($classVo, $rect, $num);
            return _this;
        }
        Dis2dBaseWindow.prototype.creatBaseRender = function () {
            this._baseRender = new UIRenderComponent;
        };
        //显示单元类, 尺寸，数量
        Dis2dBaseWindow.prototype.initData = function ($classVo, $rect, $num) {
            this._voNum = Math.floor($num);
            this._voRect = $rect;
            var kkwA = Math.pow(2, Math.ceil(Math.log($rect.x * $rect.width) / Math.log(2)));
            var kkhB = Math.pow(2, Math.ceil(Math.log($rect.x * $rect.width) / Math.log(2)));
            this._textureRect = new Rectangle(0, 0, kkwA, kkhB);
            this._baseRender.uiAtlas = new UIAtlas();
            var $uiAtlas = this._baseRender.uiAtlas;
            $uiAtlas.configData = new Array();
            $uiAtlas.ctx = UIManager.getInstance().getContext2D(this._textureRect.width, this._textureRect.height, false);
            $uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture($uiAtlas.ctx);
            this.makeBaseUi($classVo);
            ;
        };
        Dis2dBaseWindow.prototype.mathSize = function ($rect, $num) {
            $rect.x = 0;
            $rect.y = 0;
            while ($rect.x * $rect.y < $num) {
                if ($rect.x * $rect.width > $rect.y * $rect.height) {
                    $rect.y++;
                }
                else {
                    $rect.x++;
                }
            }
        };
        //根据数量创建单元格UICompenent 并存在数组中，待需要时应用
        Dis2dBaseWindow.prototype.makeBaseUi = function ($classVo) {
            var $uiAtlas = this._baseRender.uiAtlas;
            this._uiItem = new Array();
            this._lostItem = new Array();
            for (var i = 0; i < this._voRect.x; i++) {
                for (var j = 0; j < this._voRect.y; j++) {
                    var $disp2DBaseText = new $classVo();
                    this._uiItem.push($disp2DBaseText);
                    $disp2DBaseText.parent = this._baseRender;
                    $disp2DBaseText.voRect = this._voRect;
                    $disp2DBaseText.textureStr = "id_" + i + "_" + j;
                    $uiAtlas.configData.push($uiAtlas.getObject($disp2DBaseText.textureStr, i * this._voRect.width, j * this._voRect.height, this._voRect.width, this._voRect.height, this._textureRect.width, this._textureRect.height));
                    $disp2DBaseText.ui = this._baseRender.creatBaseComponent($disp2DBaseText.textureStr);
                }
            }
        };
        //找到可用的单元 找到后赋值并添加ui到显示队列
        Dis2dBaseWindow.prototype.showTemp = function ($data) {
            this.clearLostItem();
            var empty;
            //找到上一个数据和现在是一样的对象.避免重复更新纹理
            for (var j = 0; j < this._uiItem.length; j++) {
                if (this._uiItem[j].data == null && this._uiItem[j].isEqualLastKey($data)) {
                    empty = this._uiItem[j];
                    break;
                }
            }
            if (!empty) {
                for (var i = 0; i < this._uiItem.length; i++) {
                    if (this._uiItem[i].data == null) {
                        empty = this._uiItem[i];
                        break;
                    }
                }
            }
            if (empty) {
                empty.data = $data;
                this.addChild(empty.ui);
            }
            else {
                this._lostItem.push($data);
            }
            return empty;
        };
        Dis2dBaseWindow.prototype.clearLostItem = function () {
            for (var i = (this._lostItem.length - 1); i > 0; i--) {
                if (this._lostItem[i].clear) {
                    this._lostItem.splice(i, 1);
                }
            }
        };
        Dis2dBaseWindow.prototype.playLost = function () {
            if (this._lostItem.length) {
                this.showTemp(this._lostItem.pop());
            }
        };
        Dis2dBaseWindow.prototype.clearOneTemp = function () {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (!this._uiItem[i].data) {
                    return;
                }
            }
            this._lostItem.length = 0;
            this.clearTemp(this._uiItem[0].data);
        };
        //清理单元内的内容并需要将对象移出显示队例
        Dis2dBaseWindow.prototype.clearTemp = function ($data) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data == $data) {
                    this._uiItem[i].data = null;
                    this.removeChild(this._uiItem[i].ui);
                    break;
                }
            }
            this.playLost();
        };
        Dis2dBaseWindow.prototype.getVoByData = function (value) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data == value) {
                    return this._uiItem[i];
                }
            }
        };
        Dis2dBaseWindow.prototype.getVoByUi = function ($ui) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    if (this._uiItem[i].ui == $ui) {
                        return this._uiItem[i];
                    }
                }
            }
        };
        Dis2dBaseWindow.prototype.clearAll = function () {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    this.clearTemp(this._uiItem[i].data);
                }
            }
        };
        Dis2dBaseWindow.prototype.update = function (t) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    this._uiItem[i].update();
                }
            }
            /*
            if (this.getUiItemLen() <( this._uiItem.length-1)) {
                this.playLost()
            }
            */
        };
        Dis2dBaseWindow.prototype.getUiItemLen = function () {
            var $num = 0;
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    $num++;
                }
            }
            return $num;
        };
        return Dis2dBaseWindow;
    }(win.BaseWindow));
    basemove.Dis2dBaseWindow = Dis2dBaseWindow;
})(basemove || (basemove = {}));
//# sourceMappingURL=BaseMoveWindos.js.map