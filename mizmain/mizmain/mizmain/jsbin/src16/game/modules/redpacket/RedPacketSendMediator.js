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
/**
 * 发送红包界面  本界面里，符石就是元宝
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var redPacket;
        (function (redPacket) {
            var RedPacketSendMediator = /** @class */ (function (_super) {
                __extends(RedPacketSendMediator, _super);
                function RedPacketSendMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 最大值的长度 */
                    _this._maxLength = 0;
                    _this._viewUI = new ui.common.RedEnvelopeUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._redConfirmMediator = new redPacket.RedConfirmMediator(app);
                    return _this;
                }
                RedPacketSendMediator.prototype.showUI = function (type) {
                    if (type != null) {
                        this.curr_type = type;
                    }
                    this.show();
                };
                RedPacketSendMediator.prototype.show = function () {
                    this._init_UI();
                    this.registerEvent();
                    _super.prototype.show.call(this);
                };
                RedPacketSendMediator.prototype._init_UI = function () {
                    this.configure_Vo = redPacket.models.RedPacketModel.getInstance().redPackDic[this.curr_type];
                    this.fushimin = this.configure_Vo.fushimin;
                    this.fishimax = this.configure_Vo.fishimax;
                    this.packmin = this.configure_Vo.packmin;
                    this.packmax = this.configure_Vo.packmax;
                    //获取当前玩家背包中的符石数量
                    this.fushiNumber = modules.bag.models.BagModel.getInstance().yuanbaoIcon;
                    this._init_label(); //初始化界面文本
                };
                /**
                 * 判断所输入的数值是否是玩家当前所能支持
                 */
                RedPacketSendMediator.prototype.onJudgeNumber = function (lab, num) {
                    if (lab == this._viewUI.hongBaoNumber_lab)
                        return;
                    if (num > this.fushiNumber) {
                        lab.color = "#ff0400";
                    }
                    else if (num <= this.fushiNumber) {
                        lab.color = "#000000";
                    }
                };
                ////////////////
                ///事件
                ////////////////
                /**注册事件
                 * @describe  UI的事件监听注册与消息监听注册
                 */
                RedPacketSendMediator.prototype.registerEvent = function () {
                    //添加自定义事件监听
                    this._viewUI.hongBaoMoneyDown_btn.on(RedPacketSendMediator.NUMBER_OVER_RANK, this, this.send_over_msg);
                    this._viewUI.hongBaoMoneyUp_btn.on(RedPacketSendMediator.NUMBER_OVER_RANK, this, this.send_over_msg);
                    this._viewUI.hongBaoNumberDown_btn.on(RedPacketSendMediator.NUMBER_OVER_RANK, this, this.send_over_msg);
                    this._viewUI.hongBaoNumberUp_btn.on(RedPacketSendMediator.NUMBER_OVER_RANK, this, this.send_over_msg);
                    //添加鼠标点击事件监听
                    this._viewUI.hongBaoMoneyDown_btn.on(LEvent.CLICK, this, this.moneyDown);
                    this._viewUI.hongBaoMoneyUp_btn.on(LEvent.CLICK, this, this.moneyUp);
                    this._viewUI.hongBaoNumberDown_btn.on(LEvent.CLICK, this, this.numberDown);
                    this._viewUI.hongBaoNumberUp_btn.on(LEvent.CLICK, this, this.numberUp);
                    //为发送红包按钮添加监听事件
                    this._viewUI.send_hongbao_btn.on(LEvent.CLICK, this, this.show_confirmUI);
                    //为输入寄语文本区域添加监听事件
                    this._viewUI.hongBaoJiYu_input.on(LEvent.MOUSE_DOWN, this, this.setText);
                    //tips按钮被点
                    this._viewUI.tips_btn.on(LEvent.MOUSE_DOWN, this, this.onSHowTipsUI);
                    //背景透明图片添加监听事件
                    this._viewUI.hideBg_img.on(LEvent.CLICK, this, this.onTipsHide);
                    modules.tips.models.TipsProxy.getInstance().on(modules.tips.models.TIPS_ON_OK, this, this.goToPutMoney);
                    modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.getNum);
                    modules.tips.models.TipsProxy.getInstance().on(RedPacketSendMediator.NUMBER_OVER_RANK, this, this.send_over_msg);
                    this._viewUI.close_btn.on(LEvent.MOUSE_UP, this, this.close_hide);
                };
                /** 取消事件 */
                RedPacketSendMediator.prototype.removeEvent = function () {
                    this._viewUI.hongBaoMoneyDown_btn.off(RedPacketSendMediator.NUMBER_OVER_RANK, this, this.send_over_msg);
                    this._viewUI.hongBaoMoneyUp_btn.off(RedPacketSendMediator.NUMBER_OVER_RANK, this, this.send_over_msg);
                    this._viewUI.hongBaoNumberDown_btn.off(RedPacketSendMediator.NUMBER_OVER_RANK, this, this.send_over_msg);
                    this._viewUI.hongBaoNumberUp_btn.off(RedPacketSendMediator.NUMBER_OVER_RANK, this, this.send_over_msg);
                    this._viewUI.hongBaoMoneyDown_btn.off(LEvent.CLICK, this, this.moneyDown);
                    this._viewUI.hongBaoMoneyUp_btn.off(LEvent.CLICK, this, this.moneyUp);
                    this._viewUI.hongBaoNumberDown_btn.off(LEvent.CLICK, this, this.numberDown);
                    this._viewUI.hongBaoNumberUp_btn.off(LEvent.CLICK, this, this.numberUp);
                    this._viewUI.send_hongbao_btn.off(LEvent.CLICK, this, this.show_confirmUI);
                    this._viewUI.hongBaoJiYu_input.off(LEvent.MOUSE_DOWN, this, this.setText);
                    this._viewUI.tips_btn.off(LEvent.MOUSE_DOWN, this, this.onSHowTipsUI);
                    this._viewUI.hideBg_img.off(LEvent.CLICK, this, this.onTipsHide);
                    modules.tips.models.TipsProxy.getInstance().off(modules.tips.models.TIPS_ON_OK, this, this.goToPutMoney);
                    modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.ON_KRYBOARD, this, this.getNum);
                    modules.tips.models.TipsProxy.getInstance().off(RedPacketSendMediator.NUMBER_OVER_RANK, this, this.send_over_msg);
                    this._viewUI.close_btn.off(LEvent.MOUSE_UP, this, this.close_hide);
                };
                /**
                 * 前往去充值
                 */
                RedPacketSendMediator.prototype.goToPutMoney = function () {
                    //商城充值入口
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                };
                /**
                 * 显示tipsUI
                 */
                RedPacketSendMediator.prototype.onSHowTipsUI = function () {
                    var param = new Laya.Dictionary();
                    param.set("title", 11490);
                    switch (this.curr_type) {
                        case RedPackType.TYPE_WORLD:
                            param.set("contentId", 11487);
                            break;
                        case RedPackType.TYPE_CLAN:
                            param.set("contentId", 11488);
                            break;
                        case RedPackType.TYPE_TEAM:
                            param.set("contentId", 11489);
                            break;
                    }
                    if (!this._tipsModule) {
                        this._tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param, true);
                    }
                    else {
                        this.onTipsHide();
                        this._tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param, true);
                    }
                    this._viewUI.hideBg_img.mouseThrough = false;
                };
                /**
                 * 关闭tips说明型提示弹窗
                 */
                RedPacketSendMediator.prototype.onTipsHide = function () {
                    if (this._tipsModule) {
                        this._tipsModule.hide();
                    }
                    this._viewUI.hideBg_img.mouseThrough = true;
                };
                /**
                 * 置空文本区域内容
                 */
                RedPacketSendMediator.prototype.setText = function () {
                    this._viewUI.hongBaoJiYu_input.text = "";
                };
                /**
                 * @describe 发送输入数值超出范围提示信息
                 */
                RedPacketSendMediator.prototype.send_over_msg = function () {
                    var msg = modules.chat.models.ChatModel._instance.chatMessageTips[160044].msg;
                    this._disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                    this._disappearMessageTipsMediator.onShow(msg);
                };
                RedPacketSendMediator.prototype.show_confirmUI = function () {
                    if (this._viewUI.hongBaoMoney_lab.color == "#ff0400") {
                        var param = new Laya.Dictionary();
                        param.set("contentId", 150506); //提示仙晶（元宝）不足，请前往充值
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, param);
                    }
                    else {
                        this._redConfirmMediator.show_UI(this.curr_type, this._viewUI.hongBaoMoney_lab.text, this._viewUI.hongBaoNumber_lab.text, this._viewUI.hongBaoJiYu_input.text);
                        this.hide();
                    }
                };
                RedPacketSendMediator.prototype.numberUp = function () {
                    var curr_text_num = Number(this._viewUI.hongBaoNumber_lab.text);
                    if (curr_text_num + 1 > this.packmax) {
                        this._viewUI.hongBaoNumber_lab.changeText(this.packmax.toString());
                        this._viewUI.hongBaoNumberUp_btn.event(RedPacketSendMediator.NUMBER_OVER_RANK);
                        return;
                    }
                    this._viewUI.hongBaoNumber_lab.changeText(String(curr_text_num + 1));
                };
                RedPacketSendMediator.prototype.numberDown = function () {
                    var curr_text_num = Number(this._viewUI.hongBaoNumber_lab.text);
                    if (curr_text_num - 1 < this.packmin) {
                        this._viewUI.hongBaoNumber_lab.changeText(this.packmin.toString());
                        this._viewUI.hongBaoMoneyDown_btn.event(RedPacketSendMediator.NUMBER_OVER_RANK);
                        return;
                    }
                    this._viewUI.hongBaoNumber_lab.changeText(String(curr_text_num - 1));
                };
                RedPacketSendMediator.prototype.moneyUp = function () {
                    var curr_text_num = Number(this._viewUI.hongBaoMoney_lab.text);
                    if (curr_text_num + 1 > this.fishimax) {
                        this._viewUI.hongBaoMoney_lab.changeText(this.fishimax.toString());
                        this._viewUI.hongBaoMoneyUp_btn.event(RedPacketSendMediator.NUMBER_OVER_RANK);
                        return;
                    }
                    this._viewUI.hongBaoMoney_lab.changeText(String(curr_text_num + 1));
                    this.onJudgeNumber(this._viewUI.hongBaoMoney_lab, curr_text_num + 1);
                };
                RedPacketSendMediator.prototype.moneyDown = function () {
                    var curr_text_num = Number(this._viewUI.hongBaoMoney_lab.text);
                    if (curr_text_num - 1 < this.fushimin) {
                        this._viewUI.hongBaoMoney_lab.changeText(this.fushimin.toString());
                        this._viewUI.hongBaoNumberDown_btn.event(RedPacketSendMediator.NUMBER_OVER_RANK);
                        return;
                    }
                    this._viewUI.hongBaoMoney_lab.changeText(String(curr_text_num - 1));
                    this.onJudgeNumber(this._viewUI.hongBaoMoney_lab, curr_text_num - 1);
                };
                RedPacketSendMediator.prototype._init_label = function () {
                    this.show_label(this.curr_type);
                    var hongbaoname = this.configure_Vo.name;
                    var fushimin = this.configure_Vo.fushimin;
                    var fishimax = this.configure_Vo.fishimax;
                    var packmin = this.configure_Vo.packmin;
                    var packmax = this.configure_Vo.packmax;
                    var _box = this._viewUI.envelope_box;
                    this._viewUI.hongBaoName_lab.text = hongbaoname;
                    var fushimin_lable = _box.getChildByName("fushimin_lable");
                    var fishimax_label = _box.getChildByName("fishimax_label");
                    fushimin_lable.text = '最小金额为' + fushimin;
                    fishimax_label.text = '最小金额为' + fishimax;
                    this._viewUI.hongBaoMoney_lab.text = fushimin.toString();
                    this._viewUI.hongBaoNumber_lab.text = packmin.toString();
                    this.onJudgeNumber(this._viewUI.hongBaoMoney_lab, fushimin);
                    console.log("---------------给文本添加监听事件------------------------------");
                    this._viewUI.hongBaoMoney_lab.on(LEvent.CLICK, this, this.updaeLabel, [fushimin, 704]);
                    this._viewUI.hongBaoNumber_lab.on(LEvent.CLICK, this, this.updaeLabel, [packmin, 884]);
                };
                RedPacketSendMediator.prototype.updaeLabel = function (text, posY) {
                    console.log("-------------------------------------文本被点击，出现小键盘！-----------------------------");
                    switch (text) {
                        case this.fushimin:
                            this._min = this.fushimin;
                            this._max = this.fishimax;
                            this.curr_label = this._viewUI.hongBaoMoney_lab;
                            break;
                        case this.packmin:
                            this._min = this.packmin;
                            this._max = this.packmax;
                            this.curr_label = this._viewUI.hongBaoNumber_lab;
                            break;
                    }
                    this.curr_text = "0";
                    var tempNum = this._max;
                    this._maxLength = 0;
                    do {
                        tempNum = Math.floor(tempNum / 10);
                        this._maxLength++;
                    } while (tempNum > 0);
                    var _XiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
                    _XiaoJianPanMediator.show(0, posY, this._viewUI);
                };
                /**
                 * 接收小键盘点击的按钮
                 * @param num
                 */
                RedPacketSendMediator.prototype.getNum = function (num) {
                    if (!this.curr_text)
                        return;
                    if (num == -2) { //点击了ok
                        if (this.curr_text.length <= 1) {
                            this.curr_label.text = this._min + "";
                            this.curr_text = this._min + "";
                            //game.modules.tips.models.TipsProxy.getInstance().event(RedPacketSendMediator.NUMBER_OVER_RANK);
                        }
                    }
                    if (num == -1) { //点击了删除
                        this.curr_text = this.curr_text.substring(0, this.curr_text.length - 1);
                        if (this.curr_text.length <= 0) {
                            this.curr_text = "0";
                        }
                        this.onJudgeNumber(this.curr_label, Number(this.curr_text));
                    }
                    if (num >= 0) {
                        var oneChar = this.curr_text.charAt(0);
                        if (oneChar != '0') {
                            this.curr_text += num;
                            if (Number(this.curr_text) > this._max) {
                                this.curr_text = this._max.toString();
                                game.modules.tips.models.TipsProxy.getInstance().event(RedPacketSendMediator.NUMBER_OVER_RANK);
                            }
                        }
                        else {
                            this.curr_text = num + "";
                        }
                    }
                    if (this.curr_text.length <= this._maxLength) {
                        this.curr_label.text = "";
                        this.curr_label.text = this.curr_text;
                    }
                    else if (this.curr_text.length == undefined) {
                        this.curr_label.text = this._min + "";
                        this.curr_text = this._min + "";
                    }
                    else {
                        this.curr_label.text = this._max + "";
                        this.curr_text = this._max + "";
                        game.modules.tips.models.TipsProxy.getInstance().event(RedPacketSendMediator.NUMBER_OVER_RANK);
                    }
                    this.onJudgeNumber(this.curr_label, Number(this.curr_text));
                };
                RedPacketSendMediator.prototype.show_label = function (type) {
                    switch (type) {
                        case RedPackType.TYPE_WORLD:
                            this._viewUI.world_label.visible = true;
                            this._viewUI.faction_label.visible = false;
                            this._viewUI.team_label.visible = false;
                            break;
                        case RedPackType.TYPE_CLAN:
                            this._viewUI.world_label.visible = false;
                            this._viewUI.faction_label.visible = true;
                            this._viewUI.team_label.visible = false;
                            break;
                        case RedPackType.TYPE_TEAM:
                            this._viewUI.world_label.visible = false;
                            this._viewUI.faction_label.visible = false;
                            this._viewUI.team_label.visible = true;
                            break;
                    }
                };
                RedPacketSendMediator.prototype.close_hide = function () {
                    this._redPacketMediator = new redPacket.RedPacketMediator(this._app);
                    this._redPacketMediator.show(this.curr_type);
                    this.hide();
                };
                RedPacketSendMediator.prototype.hide = function () {
                    this.onTipsHide();
                    this.removeEvent();
                    _super.prototype.hide.call(this);
                };
                RedPacketSendMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /** 输入的数值超出范围事件 */
                RedPacketSendMediator.NUMBER_OVER_RANK = "numberOverRank";
                return RedPacketSendMediator;
            }(game.modules.UiMediator));
            redPacket.RedPacketSendMediator = RedPacketSendMediator;
        })(redPacket = modules.redPacket || (modules.redPacket = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RedPacketSendMediator.js.map