/**
 * 赠送礼物类
 */
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
var game;
(function (game) {
    var modules;
    (function (modules) {
        var friend;
        (function (friend) {
            var gift;
            (function (gift) {
                /**蝶恋花 */
                gift[gift["dielian"] = 101423] = "dielian";
                /**郁虹花 */
                gift[gift["yuhong"] = 101424] = "yuhong";
            })(gift || (gift = {}));
            var shopid;
            (function (shopid) {
                /** 蝶恋花商品id*/
                shopid[shopid["dielianshopid"] = 4042] = "dielianshopid";
                /** 郁虹花商品id*/
                shopid[shopid["yuhongshopid"] = 4043] = "yuhongshopid";
            })(shopid || (shopid = {}));
            var GiveGiftViewMediator = /** @class */ (function (_super) {
                __extends(GiveGiftViewMediator, _super);
                function GiveGiftViewMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**选中列表下标 */
                    _this.selectNum = 0;
                    /**礼物数 */
                    _this.giftNum = 0;
                    /** 弹出次数 */
                    _this.times = 1;
                    /** 被选中道具的索引 */
                    _this.itemSelectedIndex = [];
                    _this._viewUI = new ui.common.FriendGiveGiftUI();
                    _this._BuyKuaiJieMediator = new modules.commonUI.BuyKuaiJieMediator(app);
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this.isCenter = true;
                    _this._app = app;
                    _this.initialize();
                    _this.registerEvent();
                    return _this;
                }
                /**初始化 */
                GiveGiftViewMediator.prototype.initialize = function () {
                    this.roleIdArr = new Array();
                    this.roleNameArr = new Array();
                    this.roleLevelArr = new Array();
                    this.roleHeadImgArr = new Array();
                    this.roleZhiyeImgArr = new Array();
                    this.bagItemArr = new Array();
                    this.sceneIdArr = new Array();
                    this.tipsArr = new Array();
                    this.sceneKeyArr = new Array();
                    this.sceneQualityArr = new Array();
                    this.sceneNumArr = new Array();
                    this.giftIdArr = new Array();
                    this.giftShopIdArr = new Array();
                    this.bagGiftNumDic = new Laya.Dictionary();
                    this.giftKeyArr = new Array();
                    this.giveNameArr = new Array();
                    this.giveNameArr = [friend.models.FriendModel.chineseStr.give_daoju, friend.models.FriendModel.chineseStr.give_gift];
                    this.giftNumDic = new Laya.Dictionary();
                    this.sceneDic = new Laya.Dictionary();
                    this.cItemAttrObj = BagModel.getInstance().itemAttrData;
                    this.ani = new Laya.Animation();
                    this._cFriendsGiveItemConfigDic = friend.models.FriendModel.getInstance().CFriendsGiveItemConfigDic;
                };
                /**注册事件监听 */
                GiveGiftViewMediator.prototype.eventListener = function () {
                    //监听好友列表初始化信息
                    friend.models.FriendProxy.getInstance().on(friend.models.SFriendsInfoInit_EVENT, this, this.onFriendsInfoInit);
                    //监听添加好友结果
                    friend.models.FriendProxy.getInstance().on(friend.models.SAddFriend_EVENT, this, this.onAddFriend);
                    //监听赠送礼物结果
                    friend.models.FriendProxy.getInstance().on(friend.models.SGiveGift_EVENT, this, this.onGiveGift);
                    //监听赠送道具结果
                    friend.models.FriendProxy.getInstance().on(friend.models.SGiveItem_EVENT, this, this.onGiveItem);
                    //监听物品数量变化
                    modules.bag.models.BagProxy.getInstance().on(modules.bag.models.REFRESH_BAG_COUNT, this, this.initItemNum);
                };
                /** 移除事件消息监听 */
                GiveGiftViewMediator.prototype.removeEvent = function () {
                    //监听好友列表初始化信息
                    friend.models.FriendProxy.getInstance().off(friend.models.SFriendsInfoInit_EVENT, this, this.onFriendsInfoInit);
                    //监听添加好友结果
                    friend.models.FriendProxy.getInstance().off(friend.models.SAddFriend_EVENT, this, this.onAddFriend);
                    //监听赠送礼物结果
                    friend.models.FriendProxy.getInstance().off(friend.models.SGiveGift_EVENT, this, this.onGiveGift);
                    //监听赠送道具结果
                    friend.models.FriendProxy.getInstance().off(friend.models.SGiveItem_EVENT, this, this.onGiveItem);
                    //监听物品数量变化
                    modules.bag.models.BagProxy.getInstance().off(modules.bag.models.REFRESH_BAG_COUNT, this, this.initItemNum);
                };
                /**赠送道具结果 */
                GiveGiftViewMediator.prototype.onGiveItem = function (e) {
                    var data = friend.models.FriendModel.getInstance().SGiveItemData.get("data");
                    //重新排列道具
                    if (data.itemNum > 0) {
                        this.initItemNum();
                        // for (var i: number = 0; i < this.sceneDic.keys.length; i++) {
                        //     this.clickSceneReduceBtn(i);
                        // }
                    }
                };
                /**赠送礼物结果 */
                GiveGiftViewMediator.prototype.onGiveGift = function (_result) {
                    //var data: hanlder.S2C_give_gift = models.FriendModel.getInstance().SGiveGiftData.get("data");
                    if (_result == GiveResult.SUCCESS) {
                        this.initItemNum();
                    }
                    else { //不是双向好友，客户端弹出确认框
                        this.isFriend();
                    }
                };
                /** 判断所要赠送对象是否存在玩家的好友列表里 */
                GiveGiftViewMediator.prototype.isFriend = function () {
                    /** 对方非当前玩家角色好友的提示语句 */
                    var _tipsMsg = 180008;
                    var targetRoleId = this.roleIdArr[this.selectNum];
                    var _isMyFriend = friend.models.FriendModel.getInstance().isMyFriend(targetRoleId);
                    if (_isMyFriend == FriendEnum.FRIEND_KEY) { //如果要赠送的对象是玩家的好友，就替换掉提示语句
                        _tipsMsg = 180007;
                    }
                    var _tipsParame = new Laya.Dictionary();
                    _tipsParame.set("contentId", _tipsMsg);
                    modules.tips.models.TipsProxy.getInstance().once(modules.tips.models.TIPS_ON_OK, this, this.continueGive, [this.times]);
                    modules.tips.models.TipsProxy.getInstance().once(modules.tips.models.TIPS_ON_CANCEL, this, this.cancelGive, [this.times]);
                    var _tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, _tipsParame);
                };
                /** 取消赠送 */
                GiveGiftViewMediator.prototype.cancelGive = function () {
                    if (this.times == 2) {
                        this.times--;
                    }
                    else if (this.times == 1) {
                        return;
                    }
                };
                /** 继续强行赠送
                 * @param flag 用来判断是否已经弹出确认框
                 */
                GiveGiftViewMediator.prototype.continueGive = function (flag) {
                    var force = isForceGive.NO;
                    if (flag && this.times != 2) {
                        this.times++;
                        Laya.timer.once(200, this, this.isFriend);
                        return;
                    }
                    else if (flag) {
                        force = isForceGive.YES;
                        this.times--;
                    }
                    for (var i = 0; i < this.giftIdArr.length; i++) {
                        if (this.giftNumDic.get(i) != 0) {
                            RequesterProtocols._instance.c2s_give_gift(FriendModel.getInstance().friendIdArr[this.selectNum], this.giftIdArr[i], this.giftNumDic.get(i), "", force);
                        }
                    }
                };
                /**添加好友成功S-->C */
                GiveGiftViewMediator.prototype.onAddFriend = function (e) {
                    this.roleIdArr.length = 0;
                    this.roleNameArr.length = 0;
                    this.roleLevelArr.length = 0;
                    this.roleHeadImgArr.length = 0;
                    this.roleZhiyeImgArr.length = 0;
                    for (var i = 0; i < FriendModel.getInstance().friendNameArr.length; i++) {
                        this.roleIdArr.push(FriendModel.getInstance().friendIdArr[i]);
                        this.roleNameArr.push(FriendModel.getInstance().friendNameArr[i]);
                        this.roleLevelArr.push(FriendModel.getInstance().friendLevelArr[i]);
                        this.roleHeadImgArr.push(FriendModel.getInstance().touxiangImgArr[i]);
                        this.roleZhiyeImgArr.push({ img: FriendModel.getInstance().zhiyeImgArr[i] });
                    }
                    this.getListData();
                };
                /**好友信息初始化加载 */
                GiveGiftViewMediator.prototype.onFriendsInfoInit = function (e) {
                    for (var i = 0; i < FriendModel.getInstance().friendNameArr.length; i++) {
                        this.roleIdArr.push(FriendModel.getInstance().friendIdArr[i]);
                        this.roleNameArr.push(FriendModel.getInstance().friendNameArr[i]);
                        this.roleLevelArr.push(FriendModel.getInstance().friendLevelArr[i]);
                        this.roleHeadImgArr.push(FriendModel.getInstance().touxiangImgArr[i]);
                        this.roleZhiyeImgArr.push({ img: FriendModel.getInstance().zhiyeImgArr[i] });
                    }
                    this.getListData();
                };
                /** 显示飘窗 */
                GiveGiftViewMediator.prototype.showDisMsg = function (msg) {
                    var _disMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    _disMsgTips.onShow(msg);
                };
                /**点击赠送按钮  */
                GiveGiftViewMediator.prototype.Send = function () {
                    if (this.roleIdArr.length == 0) { //玩家没有添加过好友，是无法赠送礼物
                        var _msg = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[180010]["msg"];
                        this.showDisMsg(_msg);
                        return;
                    }
                    //赠送礼物
                    if (this._viewUI.gift_box.visible == true) {
                        this.continueGive();
                    }
                    //赠送道具
                    /**
                     * 赠送目标的角色id
                     * 赠送的道具列表 key=itemKey value=itemNum
                     */
                    if (this._viewUI.scene_box.visible == true) {
                        if (this.sceneDic.keys.length > 0) {
                            var targetRoleId = this.roleIdArr[this.selectNum];
                            var _isMyFriend = friend.models.FriendModel.getInstance().isMyFriend(targetRoleId);
                            if (_isMyFriend == FriendEnum.FRIEND_KEY) { //对方是玩家自己的好友才能赠送道具
                                RequesterProtocols._instance.c2s_give_item(targetRoleId, this.sceneDic);
                            }
                            else { //若不是好友，则飘窗提示
                                var _msg2 = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[420044]["msg"];
                                this.showDisMsg(_msg2);
                            }
                            //清除掉选中特效以及其它的UI表现
                            //不管是赠送道具成功后：该道具就从玩家角色背包消失了，但赠送礼物界面所显示的道具列表中，被赠送成功道具的位置会被顶替，所以需要清掉
                            //还是赠送道具失败：存放要被赠送道具的字典被清空，界面UI也不能表现出被选中的效果
                            if (this.itemSelectedIndex.length != 0) {
                                var tempArr = [];
                                for (var i = 0; i < this.itemSelectedIndex.length; i++) {
                                    tempArr.push(this.itemSelectedIndex[i]);
                                }
                                for (var i = 0; i < tempArr.length; i++) {
                                    this.clickSceneReduceBtn(tempArr[i]);
                                }
                            }
                            this.sceneDic.clear();
                            this.initItemNum();
                        }
                    }
                };
                /**初始化联系人列表 */
                GiveGiftViewMediator.prototype.getListData = function () {
                    this._viewUI.roleList_list.vScrollBarSkin = "";
                    this._viewUI.roleList_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.roleList_list.scrollBar.elasticDistance = 50;
                    this._viewUI.roleList_list.array = this.roleIdArr;
                    this._viewUI.roleList_list.renderHandler = new Handler(this, this.onRender);
                    this._viewUI.roleList_list.selectHandler = new Handler(this, this.onSelect);
                    this._viewUI.roleList_list.selectedIndex = -1;
                };
                /**渲染联系人列表 */
                GiveGiftViewMediator.prototype.onRender = function (cell, index) {
                    var roleInfo_btn = cell.getChildByName("roleInfo_btn");
                    roleInfo_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    if (this.selectBtn) {
                        this.selectBtn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    }
                    var nameLab = roleInfo_btn.getChildByName("roleName_lab");
                    var levelLab = roleInfo_btn.getChildByName("roleLevel_lab");
                    var contactContentImg = roleInfo_btn.getChildByName("roleContent_img");
                    var contactSchoolImg = roleInfo_btn.getChildByName("school_img");
                    nameLab.text = this.roleNameArr[index];
                    levelLab.text = this.roleLevelArr[index].toString();
                    contactContentImg.skin = this.roleHeadImgArr[index].img;
                    contactSchoolImg.skin = this.roleZhiyeImgArr[index].img;
                };
                /**处理联系人列表点击事件 */
                GiveGiftViewMediator.prototype.onSelect = function (index) {
                    if (index != -1) {
                        this.selectNum = index;
                        this._viewUI.roleList_list.selectedIndex = -1;
                        var _roleInfo_btn = this._viewUI.roleList_list.getCell(index).getChildByName("roleInfo_btn");
                        _roleInfo_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                        this.selectBtn = _roleInfo_btn;
                    }
                };
                /**初始化道具列表 */
                GiveGiftViewMediator.prototype.getSceneListData = function () {
                    this._viewUI.scene_list.vScrollBarSkin = "";
                    this._viewUI.scene_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.scene_list.scrollBar.elasticDistance = 50;
                    this._viewUI.scene_list.array = this.sceneIdArr;
                    this._viewUI.scene_list.renderHandler = new Handler(this, this.onSceneRender);
                };
                /**渲染道具列表 */
                GiveGiftViewMediator.prototype.onSceneRender = function (cell, index) {
                    var levelLab = cell.getChildByName("scene_btn").getChildByName("sceneLevel_lab");
                    var sceneContentImg = cell.getChildByName("scene_btn").getChildByName("sceneContent_img");
                    var sceneFrame_img = cell.getChildByName("scene_btn").getChildByName("sceneFrame_img");
                    var sceneBtn = cell.getChildByName("scene_btn");
                    var sceneReduceBtn = cell.getChildByName("sceneReduce_btn");
                    var sceneNum_lab = cell.getChildByName("scene_btn").getChildByName("sceneNum_lab");
                    var sceneAddNum_lab = cell.getChildByName("scene_btn").getChildByName("sceneAddNum_lab");
                    var _addNum = this.sceneDic.get(this.sceneKeyArr[index]);
                    if (_addNum) {
                        sceneAddNum_lab.text = _addNum.toString();
                    }
                    else {
                        sceneAddNum_lab.text = "0";
                    }
                    sceneBtn.on(LEvent.MOUSE_DOWN, this, this.clickSceneBtn, [index]);
                    sceneReduceBtn.on(LEvent.MOUSE_DOWN, this, this.clickSceneReduceBtn, [index]);
                    if (this.sceneQualityArr[index]) {
                        levelLab.text = modules.skill.models.SkillModel.chineseStr.dengji + this.sceneQualityArr[index];
                    }
                    else {
                        levelLab.visible = false;
                    }
                    sceneContentImg.skin = "common/icon/item/" + this.cItemAttrObj[this.sceneIdArr[index]]["icon"] + ".png";
                    sceneNum_lab.text = this.sceneNumArr[index] + "";
                    sceneFrame_img.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(this.cItemAttrObj[this.sceneIdArr[index]]["nquality"]);
                };
                /**添加道具 */
                GiveGiftViewMediator.prototype.clickSceneBtn = function (index) {
                    this.itemSelectedIndex.push(index);
                    var sceneReduceBtn = this._viewUI.scene_list.getCell(index).getChildByName("sceneReduce_btn");
                    sceneReduceBtn.visible = true;
                    this.PlaySceneEffect(this._viewUI.scene_list, index);
                    //this.showItemTips(this.sceneKeyArr[index]);
                    var sceneAddNum_lab = this._viewUI.scene_list.getCell(index).getChildByName("scene_btn").getChildByName("sceneAddNum_lab");
                    var addNum = Number(sceneAddNum_lab.text);
                    addNum++;
                    if (addNum > this.sceneNumArr[index]) {
                        addNum = this.sceneNumArr[index];
                    }
                    this.sceneDic.set(this.sceneKeyArr[index], addNum);
                    sceneAddNum_lab.text = addNum.toString();
                };
                /**减少道具 */
                GiveGiftViewMediator.prototype.clickSceneReduceBtn = function (index) {
                    var sceneReduceBtn = this._viewUI.scene_list.getCell(index).getChildByName("sceneReduce_btn");
                    var sceneAddNum_lab = this._viewUI.scene_list.getCell(index).getChildByName("scene_btn").getChildByName("sceneAddNum_lab");
                    var addNum = Number(sceneAddNum_lab.text);
                    addNum--;
                    if (addNum == 0) {
                        addNum = 0;
                        this.sceneDic.remove(this.sceneKeyArr[index]);
                        sceneReduceBtn.visible = false;
                        if (this.ani) {
                            this.ani.clear();
                        }
                    }
                    sceneAddNum_lab.text = addNum.toString();
                    var _tempIndex;
                    for (var i = 0; i < this.itemSelectedIndex.length; i++) {
                        if (this.itemSelectedIndex[i] == index) {
                            _tempIndex = i;
                            break;
                        }
                    }
                    this.itemSelectedIndex.splice(_tempIndex, 1);
                };
                /**初始化礼物列表 */
                GiveGiftViewMediator.prototype.getGiftListData = function () {
                    this._viewUI.gift_list.vScrollBarSkin = "";
                    this._viewUI.gift_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.gift_list.scrollBar.elasticDistance = 50;
                    this._viewUI.gift_list.array = this.giftIdArr;
                    this._viewUI.gift_list.renderHandler = new Handler(this, this.onGiftRender);
                };
                /**渲染礼物列表 */
                GiveGiftViewMediator.prototype.onGiftRender = function (cell, index) {
                    var giftNumLab = cell.getChildByName("gift_btn").getChildByName("giftNum_lab");
                    var sceneContentImg = cell.getChildByName("gift_btn").getChildByName("giftContent_img");
                    var giftReduceBtn = cell.getChildByName("giftReduce_btn");
                    var giftBtn = cell.getChildByName("gift_btn");
                    if (this.bagGiftNumDic.get(this.giftIdArr[index]) != undefined) {
                        giftNumLab.text = this.giftNumDic.get(index) + "/" + this.bagGiftNumDic.get(this.giftIdArr[index]);
                    }
                    else {
                        giftNumLab.text = 0 + "/" + 0;
                    }
                    if (this.giftNumDic.get(index) == 0) {
                        giftReduceBtn.visible = false;
                    }
                    giftBtn.on(LEvent.MOUSE_DOWN, this, this.clickGiftBtn, [index]);
                    giftReduceBtn.on(LEvent.MOUSE_DOWN, this, this.clickReduceBtn, [index]);
                    sceneContentImg.skin = "common/icon/item/" + this.cItemAttrObj[this.giftIdArr[index]]["icon"] + ".png";
                };
                /** 播放特效 */
                GiveGiftViewMediator.prototype.PlaySceneEffect = function (list, index) {
                    var cell = list.getCell(index);
                    var selectItem = cell.getChildByName("scene_btn").getChildByName("sceneEffect_img");
                    this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onCreateFrame));
                    selectItem.addChild(this.ani);
                    this.ani.scaleX = 1;
                    this.ani.scaleY = 1;
                };
                /**播放礼物选中特效 */
                GiveGiftViewMediator.prototype.PlayGiftEffect = function (list, index) {
                    var cell = list.getCell(index);
                    var selectItem = cell.getChildByName("gift_btn").getChildByName("giftEffect_img");
                    this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onCreateFrame));
                    selectItem.addChild(this.ani);
                    this.ani.scaleX = 1;
                    this.ani.scaleY = 1;
                };
                /** 创建动画 */
                GiveGiftViewMediator.prototype.onCreateFrame = function () {
                    var effecthPath = bagModel.getInstance().getEffectUrls("xuanzhong", 9);
                    Laya.Animation.createFrames(effecthPath, "xuanzhong");
                    this.ani.play(0, true, "xuanzhong");
                    this.ani.interval = 112;
                };
                /**增加礼物 */
                GiveGiftViewMediator.prototype.clickGiftBtn = function (index) {
                    var giftReduceBtn = this._viewUI.gift_list.getCell(index).getChildByName("giftReduce_btn");
                    var giftNumLab = this._viewUI.gift_list.getCell(index).getChildByName("gift_btn").getChildByName("giftNum_lab");
                    if (this.bagGiftNumDic.get(this.giftIdArr[index]) != undefined && this.bagGiftNumDic.get(this.giftIdArr[index]) != 0) {
                        this.PlayGiftEffect(this._viewUI.gift_list, index);
                        giftReduceBtn.visible = true;
                        this.changeNum(index);
                        var num = this.giftNum;
                        if (num < this.bagGiftNumDic.get(this.giftIdArr[index])) {
                            //清空礼物数量
                            for (var i = 0; i < this.giftIdArr.length; i++) {
                                this.giftNumDic.set(i, 0);
                            }
                            num++;
                            this.giftNumDic.set(index, num);
                        }
                        giftNumLab.text = this.giftNumDic.get(index) + "/" + this.bagGiftNumDic.get(this.giftIdArr[index]);
                        //this.showItemTips(this.giftKeyArr[index]);
                    }
                    else {
                        this._BuyKuaiJieMediator.init(this.giftShopIdArr[index]); //快捷购买
                    }
                };
                /**减少礼物 */
                GiveGiftViewMediator.prototype.clickReduceBtn = function (index) {
                    var giftReduceBtn = this._viewUI.gift_list.getCell(index).getChildByName("giftReduce_btn");
                    var giftNumLab = this._viewUI.gift_list.getCell(index).getChildByName("gift_btn").getChildByName("giftNum_lab");
                    this.changeNum(index);
                    var num = this.giftNum;
                    if (num > 0) {
                        num--;
                        this.giftNumDic.set(index, num);
                    }
                    if (this.giftNumDic.get(index) == 0) {
                        giftReduceBtn.visible = false;
                        this.ani.clear();
                    }
                    giftNumLab.text = this.giftNumDic.get(index) + "/" + this.bagGiftNumDic.get(this.giftIdArr[index]);
                };
                /**改变礼物数量 */
                GiveGiftViewMediator.prototype.changeNum = function (index) {
                    this.giftNum = 0;
                    this.giftNum = this.giftNumDic.get(index);
                };
                /**根据 item key 获取选中的道具信息 */
                GiveGiftViewMediator.prototype.getItemBack = function (chatkey, fromBag) {
                    var TipsLength = ChatModel.getInstance().chatTips.length;
                    var key;
                    if (chatkey) {
                        key = chatkey;
                    }
                    else {
                        key = ChatModel.getInstance().chatTips[TipsLength - 1].uniqid;
                    }
                    var itemList = bagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
                    for (var itemListIndex = 0; itemListIndex < itemList.length; itemListIndex++) {
                        if (itemList[itemListIndex].key == key) {
                            return itemList[itemListIndex];
                        }
                    }
                    return false;
                };
                /** 聊天频道点击显示物品的Tips */
                GiveGiftViewMediator.prototype.showItemTips = function (key, fromBag, app, viewUI) {
                    var chatkey = key;
                    var item;
                    if (!fromBag) {
                        item = this.getItemBack(chatkey);
                    }
                    else {
                        item = this.getItemBack(chatkey, fromBag);
                    }
                    if (item) {
                        var parame = void 0;
                        parame = new Laya.Dictionary();
                        var obj = BagModel.getInstance().getItemAttrData(item.id);
                        try {
                            var equipType = StrengTheningModel.getInstance().equipEffectData[item.id].eequiptype;
                        }
                        catch (error) {
                            equipType = -1;
                        }
                        parame.set("itemId", item.id);
                        parame.set("key", item.key);
                        parame.set("packid", 1);
                        parame.set("outbattleuse", obj.outbattleuse);
                        parame.set("shopid", obj.bCanSaleToNpc);
                        parame.set("number", item.number);
                        parame.set("equiptype", equipType);
                        var isShow = true;
                        if (!app) {
                            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, isShow);
                        }
                        else {
                            this._tipsModule = new game.modules.tips.tipsModule(viewUI, app, TIPS_TYPE.BAG, parame, isShow);
                        }
                    }
                };
                /**初始化道具数量 */
                GiveGiftViewMediator.prototype.initItemNum = function () {
                    this.bagItemArr.length = 0;
                    this.sceneIdArr.length = 0;
                    this.sceneKeyArr.length = 0;
                    this.sceneNumArr.length = 0;
                    this.giftIdArr.length = 0;
                    this.bagGiftNumDic = new Laya.Dictionary();
                    this.giftShopIdArr.length = 0;
                    this.giftKeyArr.length = 0;
                    this.tipsArr.length = 0;
                    this.sceneQualityArr.length = 0;
                    var tips = game.modules.strengThening.models.StrengTheningModel._instance.equipTips;
                    //存放背包物品
                    var bag = game.modules.bag.models.BagModel.getInstance().bagMap;
                    for (var i = 0; i < bag[BagTypes.BAG]["items"].length; i++) {
                        var itemId = bag[BagTypes.BAG]["items"][i]["id"];
                        var flags = bag[BagTypes.BAG]["items"][i]["flags"];
                        if (!BagModel.getInstance().itemIsBind(flags)) {
                            this.bagItemArr.push(bag[BagTypes.BAG]["items"][i]);
                        }
                    }
                    //存放临时背包物品
                    for (var i = 0; i < bag[BagTypes.TEMP]["items"].length; i++) {
                        var itemId = bag[BagTypes.TEMP]["items"][i]["id"];
                        var flags = bag[BagTypes.TEMP]["items"][i]["flags"];
                        if (!BagModel.getInstance().itemIsBind(flags)) {
                            this.bagItemArr.push(bag[BagTypes.TEMP]["items"][i]);
                        }
                    }
                    //筛选出所需道具id和key
                    for (var i = 0; i < this.bagItemArr.length; i++) {
                        if (this._cFriendsGiveItemConfigDic[this.bagItemArr[i]["id"]] != undefined) {
                            this.sceneIdArr.push(this.bagItemArr[i]["id"]);
                            this.sceneKeyArr.push(this.bagItemArr[i]["key"]);
                            this.sceneNumArr.push(this.bagItemArr[i]["number"]);
                        }
                    }
                    //初始化礼物id和数量
                    this.giftIdArr.push(gift.dielian, gift.yuhong);
                    this.giftShopIdArr.push(shopid.dielianshopid, shopid.yuhongshopid);
                    for (var i = 0; i < this.giftIdArr.length; i++) {
                        this.giftNumDic.set(i, 0);
                    }
                    //把背包存在的礼物存到字典中去
                    for (var i = 0; i < this.bagItemArr.length; i++) {
                        if (this.bagItemArr[i]["id"] == this.giftIdArr[0]) {
                            this.bagGiftNumDic.set(this.giftIdArr[0], this.bagItemArr[i]["number"]);
                        }
                        else if (this.bagItemArr[i]["id"] == this.giftIdArr[1]) {
                            this.bagGiftNumDic.set(this.giftIdArr[1], this.bagItemArr[i]["number"]);
                        }
                    }
                    //把背包没有的礼物，在里写到字典
                    for (var i_1 = 0; i_1 < this.giftIdArr.length; i_1++) {
                        if (this.bagGiftNumDic.get(this.giftIdArr[0]) == undefined) {
                            this.bagGiftNumDic.set(this.giftIdArr[0], 0);
                        }
                    }
                    //初始化提示
                    for (var i = 0; i < tips.length; i++) {
                        if (tips[i]["packid"] == 1) {
                            this.tipsArr.push(tips[i]);
                        }
                    }
                    //存放所需道具品质
                    for (var i = 0; i < this.tipsArr.length; i++) {
                        for (var j = 0; j < this.sceneKeyArr.length; j++) {
                            if (this.tipsArr[i]["keyinpack"] == this.sceneKeyArr[j]) {
                                this.sceneQualityArr.push(this.tipsArr[i]["tips"]["quality"]);
                            }
                        }
                    }
                    this.getSceneListData();
                    this.getGiftListData();
                };
                /**初始化选择列表 */
                GiveGiftViewMediator.prototype.getGiveListData = function () {
                    this._viewUI.give_list.vScrollBarSkin = "";
                    this._viewUI.give_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.give_list.scrollBar.elasticDistance = 50;
                    this._viewUI.give_list.array = this.giveNameArr;
                    this._viewUI.give_list.renderHandler = new Handler(this, this.ongiveRender);
                    this._viewUI.give_list.selectHandler = new Handler(this, this.onselectlist);
                    this._viewUI.give_list.selectedIndex = 0;
                };
                /**渲染选择列表 */
                GiveGiftViewMediator.prototype.ongiveRender = function (cell, index) {
                    var giveBtn = cell.getChildByName("give_btn");
                    giveBtn.label = this.giveNameArr[index];
                };
                /**切换联系人面板 */
                GiveGiftViewMediator.prototype.onselectlist = function (index) {
                    var giveBtn = this._viewUI.give_list.getCell(index).getChildByName("give_btn");
                    giveBtn.selected = true;
                    for (var i = 0; i < this.giveNameArr.length; i++) {
                        if (i != index) {
                            var otherBtn = this._viewUI.give_list.getCell(i).getChildByName("give_btn");
                            otherBtn.selected = false;
                        }
                    }
                    if (this._viewUI.give_list.selectedIndex == 0) { //显示能赠送的道具
                        this._viewUI.scene_box.visible = true;
                        this._viewUI.gift_box.visible = false;
                    }
                    else { //显示额能赠送的礼物
                        this._viewUI.scene_box.visible = false;
                        this._viewUI.gift_box.visible = true;
                    }
                };
                GiveGiftViewMediator.prototype.show = function (flag) {
                    this.eventListener();
                    _super.prototype.show.call(this);
                    this.onLoad();
                    if (flag) {
                        this.onFriendsInfoInit();
                    }
                    else {
                        this.getListData();
                    }
                    this.getGiveListData();
                };
                GiveGiftViewMediator.prototype.onShow = function (data) {
                    this.show(true);
                    LoginModel.getInstance().CommonPage = "friend";
                    var index = this.roleIdArr.indexOf(data[0]);
                    //将要赠送礼物对象排在联系人列表第一的位置
                    if (index > -1) {
                        this.roleIdArr.splice(index, 1);
                        this.roleNameArr.splice(index, 1);
                        this.roleLevelArr.splice(index, 1);
                        this.roleHeadImgArr.splice(index, 1);
                        this.roleZhiyeImgArr.splice(index, 1);
                    }
                    this.roleIdArr.unshift(data[0]);
                    this.roleNameArr.unshift(data[1]);
                    this.roleLevelArr.unshift(data[2]);
                    var isOnLine = data[5];
                    if (isOnLine && isOnLine == FriendEnum.ONLINE_STATE) {
                        this.roleHeadImgArr.unshift({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + data[3]) + ".png" });
                    }
                    else if (isOnLine && isOnLine == FriendEnum.ONLINE_STATE) {
                        this.roleHeadImgArr.unshift({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + data[3]) + ".png" });
                    }
                    else if (!isOnLine) {
                        var _roleid = data[0]; //传过来的参数数据中的角色id
                        if (FriendModel.getInstance().isMyFriend(_roleid) == FriendEnum.FRIEND_KEY) {
                            var _friendIdArr = FriendModel.getInstance().friendIdArr;
                            var _touxiangImgArr = FriendModel.getInstance().touxiangImgArr;
                            this.roleHeadImgArr.unshift(_touxiangImgArr[_friendIdArr.indexOf(_roleid)]);
                        }
                        else {
                            this.roleHeadImgArr.unshift({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + data[3]) + ".png" });
                        }
                    }
                    this.roleZhiyeImgArr.unshift({ img: data[4] });
                    this.getListData();
                    this.onSelect(0);
                };
                GiveGiftViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    this.removeEvent();
                    if (this.selectBtn) {
                        this.selectBtn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                };
                GiveGiftViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                GiveGiftViewMediator.prototype.onLoad = function () {
                    this.initItemNum();
                    if (this.ani) {
                        this.ani.clear();
                    }
                };
                /**注册点击事件 */
                GiveGiftViewMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.send_btn.on(LEvent.MOUSE_DOWN, this, this.Send);
                };
                return GiveGiftViewMediator;
            }(game.modules.UiMediator));
            friend.GiveGiftViewMediator = GiveGiftViewMediator;
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=GiveGiftViewMediator.js.map