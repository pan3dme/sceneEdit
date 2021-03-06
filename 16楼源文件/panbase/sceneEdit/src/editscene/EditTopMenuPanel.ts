﻿module editscene {
    import UICompenent = Pan3d.me.UICompenent
    import UIRenderComponent = Pan3d.me.UIRenderComponent
    import InteractiveEvent = Pan3d.me.InteractiveEvent
    import TextAlign = Pan3d.me.TextAlign
    import ModuleEventManager = Pan3d.me.ModuleEventManager
    import UIManager = Pan3d.me.UIManager
    import LabelTextFont = Pan3d.me.LabelTextFont
    import Disp2DBaseText = Pan3d.me.Disp2DBaseText
    import UIRectangle = Pan3d.me.UIRectangle
    import TextureManager = Pan3d.me.TextureManager
    import Rectangle = Pan3d.me.Rectangle
    import UIAtlas = Pan3d.me.UIAtlas
    import ByteArray = Pan3d.me.Pan3dByteArray
    import LoadManager = Pan3d.me.LoadManager
    import Scene_data = Pan3d.me.Scene_data
    import Dis2DUIContianerPanel = Pan3d.me.Dis2DUIContianerPanel

    export class MenuListData {
        public label: string
        public level: number;
        public subMenu: Array<MenuListData>;
        public select: boolean;
        public key: string

        constructor($label: string, $key: string = null) {
            this.select = false
            this.label = $label;
            this.key = $key;


        }

    }
    export class LabelTxtVo extends Disp2DBaseText {
        public uiScale: number=0.5
        public makeData(): void {
            if (this.data) {
      
                this.ui.width = this.ui.baseRec.width * this.uiScale
                this.ui.height = this.ui.baseRec.height * this.uiScale
                
                var $menuListData: MenuListData = this.data
                var $uiRec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);

               
                var colorBg: string = $menuListData.select ? "#6c6c6c" : "#535353";
                var colorFont: string = $menuListData.select ? "[ffffff]" : "[9c9c9c]";

                switch ($menuListData.level) {
                    case 0:

                        colorBg = $menuListData.select ? "#6c6c6c" : "#535353";
                        colorFont = $menuListData.select ? "[ffffff]" : "[9c9c9c]";

                        break
                    case 1:

                        colorBg = $menuListData.select ? "#353535" : "#535353";
                        colorFont = $menuListData.select ? "[ffffff]" : "[9c9c9c]";

                        break
                    default:

                        colorBg = $menuListData.select ? "#6c6c6c" : "#535353";
                         colorFont = $menuListData.select ? "[ffffff]" : "[9c9c9c]";
                        break

                }

                this.parent.uiAtlas.ctx.fillStyle = colorBg; // text color
                this.parent.uiAtlas.ctx.fillRect(0, 0, $uiRec.pixelWitdh, $uiRec.pixelHeight);
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, colorFont + $menuListData.label, 24, 0, 10, TextAlign.CENTER)

                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);
            }




        }
    }

    export class EditTopMenuPanel extends Dis2DUIContianerPanel {

        public static _instance: any;
        public static getInstance(): EditTopMenuPanel {
            if (!this._instance) {
                this._instance = new EditTopMenuPanel();
            }
            return this._instance;
        }

        private _bottomRender: UIRenderComponent
        public constructor() {
            super(LabelTxtVo, new Rectangle(0, 0, 140, 48), 50);

            this._bottomRender = new UIRenderComponent();
            this._bottomRender.uiAtlas = new UIAtlas();
            this._bottomRender.uiAtlas.setInfo("ui/window/window.txt", "ui/window/window.png", () => { this.loadConfigCom() });
            this.addRenderAt(this._bottomRender, 0);
 
            AppData.topPanel.addUIContainer(this)

        }
        private winBg: UICompenent
        private loadConfigCom(): void {
        
            this.winBg = this.addChild(<UICompenent>this._bottomRender.getComponent("e_topmenu_bg"));

    
            this.uiLoadComplete = true

            this.resize()

        }
  
        public resize(): void {
            super.resize()
            if (this.uiLoadComplete) {
                this.winBg.x = 0
                this.winBg.y = 0;
                this.winBg.width = Scene_data.stageWidth
                this.winBg.height = 29

            }
        }
        private menuXmlItem: Array<MenuListData>
        public initMenuData(value: any): void {
            this.clearAll();
            this.menuXmlItem = value.menuXmlItem;
            meshFunSon(this.menuXmlItem, 0)
            function meshFunSon(subMenu: Array<MenuListData>, level: number): void {
                for (var i: number = 0; subMenu && i < subMenu.length; i++) {
                    subMenu[i].level = level;
                    meshFunSon(subMenu[i].subMenu, level + 1);

                }
            }
        }

        private getMenu0(): MenuListData {
            var $vo: MenuListData = new MenuListData("菜单", "1")
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("保存场景", "11"));
            $vo.subMenu.push(new MenuListData("清理场景", "12"));
            return $vo
        }
        private getMenu1(): MenuListData {
            var $vo: MenuListData = new MenuListData("窗口", "2")
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("场景属性", "21"));
            $vo.subMenu.push(new MenuListData("测试导入场景", "22"));
            $vo.subMenu.push(new MenuListData("文件列表", "23"));
            return $vo
        }
        private getMenu2(): MenuListData {
            var $vo: MenuListData = new MenuListData("导入", "3")
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("导入场景", "31"));
            $vo.subMenu.push(new MenuListData("导入模型", "32"));
            $vo.subMenu.push(new MenuListData("导入特效", "33"));
            $vo.subMenu.push(new MenuListData("临时修改", "34"));
            return $vo
        }
        public makeSceneTopMenu(): void {

            var temp: any = {};
            var menuA: Array<MenuListData> = new Array();
            menuA.push(this.getMenu0());
            menuA.push(this.getMenu1());
            menuA.push(this.getMenu2());
 
 
            menuA.push(new MenuListData("系统", "3"));
            temp.menuXmlItem = menuA;
            this.bfun = (value: any, evt: InteractiveEvent) => { this.menuBfun(value, evt) }
            this.initMenuData(temp)
            this.showMainUi()
        }
        public makeTextureTopMenu(): void {

            var temp: any = {};
            var menuB: Array<MenuListData> = new Array();
            menuB.push(new MenuListData("保存材质", "1001"));
            menuB.push(new MenuListData("编译材质", "1002"));
            menuB.push(new MenuListData("关闭材质窗口", "1003"));
            menuB.push(new MenuListData("返回场景", "1004"));

            temp.menuXmlItem = menuB;
            this.bfun = (value: any, evt: InteractiveEvent) => { this.menuBfun(value, evt) }
            this.initMenuData(temp)
            this.showMainUi()
        }
        private menuBfun(value: any, evt: InteractiveEvent): void {
            console.log(value.key)

            switch (value.key) {
                case "11":
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SAVE_SCENE_MAP_TO_SEVER))
                    break
                case "12":
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.CLEAR_SCENE_MAP_ALL))
                    break
                case "21":
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_SCENE_POJECT_MESH_VIEW))
                    break
                case "22":
              
                    break
                case "23":
            
                    break
                case "31":
                     //解析地图
                    pack.FileOssModel.upTempFileToOss(($file: File) => {
                        var idx: number = AppData.mapOpenUrl.lastIndexOf(".");
                        if (idx != -1) {
                            var mapDic: string = AppData.mapOpenUrl.substring(0, idx)+"/"
                            inputres.ImputGameResModel.getInstance().inputSceneFile($file, mapDic)
                        }

                    })
                    break
                case "32":
                    pack.FileOssModel.upTempFileToOss(($file: File) => {
                        this.inputH5roleRes($file)
                    })
                    break
                case "34":
                 
                    break
                case "1001":
                    ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SAVE_MATERIA_PANEL));
                    break
                case "1002":
                    ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
                    break
                case "1003":
               
                    break
                case "1004":
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_MAIN_EDITOR_PANEL));
                    break
                default:
    
                    break
            }
        }
        private isRoleFile(arrayBuffer: ArrayBuffer): boolean {
            var $byte: ByteArray = new ByteArray(arrayBuffer);
            $byte.position = 0
            var $version: number = $byte.readInt();
            var $url: string = $byte.readUTF();
            if ($url.indexOf("role/") != -1) {
                return true
            } else {
                return false
            }

        }

        private inputH5roleRes(soureFile: File): void {
            var $reader: FileReader = new FileReader();
            $reader.readAsArrayBuffer(soureFile);
            $reader.onload = ($temp: Event) => {
                if (this.isRoleFile(<ArrayBuffer>$reader.result)) {
                    var role: left.MaterialRoleSprite = new left.MaterialRoleSprite();
                    maineditor.MainEditorProcessor.edItorSceneManager.addMovieDisplay(role);
                    pack.RoleChangeModel.getInstance().loadLocalFile(<ArrayBuffer>$reader.result, role)

                    
                    var $roleStr: string = pack. RoleChangeModel.getInstance().getChangeRoleStr();
                    if ($roleStr) {
                        var $file: File = new File([$roleStr], "ossfile.txt");
                        console.log(soureFile.name)
                        var baseRoot: string = AppData.getPerentPath(AppData.rootFilePath)
                        console.log(baseRoot)
                        var pathurl: string = baseRoot + soureFile.name.replace(".txt", ".zzw");
                        pack.FileOssModel.upOssFile($file, pathurl, () => {
                            console.log("上传成功", pathurl);
                        })
                    } else {
                        console.log("没有可上传mesh数据");
                    }
             
                } else {
                    alert("不确定类型,需要角色文件role/");
                }
            }
        }
        private changeZZW(): void {
            var $url: string = "pefab/role_base.zzw"
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.XML_TYPE,
                ($str: string) => {
                    var temp: any = JSON.parse($str);
                     temp.textureurl = "base.material";
                    var $file: File = new File([JSON.stringify(temp)], "ossfile.txt");
                    var pathUrl: string = Pan3d.me.Scene_data.fileRoot + $url
                    var pathurl: string = pathUrl.replace(Pan3d.me.Scene_data.ossRoot, "");
 
                    pack.FileOssModel.upOssFile($file, pathurl, () => {
                        console.log("上传成功");
                    })

                });
        }


    
        public showMainUi(): void {
            this.clearAll();
            Pan3d.me.Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onStageMouseUp, this);
            this.showSon(this.menuXmlItem,20,0);
        }
        private onStageMouseUp($evt: InteractiveEvent): void {
        
            this.removeOtherSonMenu(0);
        }
        public showTempMenu($data: MenuListData, i: number, tx: number, ty: number): LabelTxtVo {

            let temp: LabelTxtVo = super.showTemp($data) as LabelTxtVo;
           
            if ($data.level == 0) {
                temp.ui.x =   i * 80;
                temp.ui.y = 3;
            } else {
                temp.ui.x = tx;
                temp.ui.y = i * 20 + ty+0;
            }
      
            

            temp.ui.addEventListener(InteractiveEvent.Move, this.butMove, this);
            temp.ui.addEventListener(InteractiveEvent.Down, this.onMouseUp, this);
            return temp
        }
        //清理单元内的内容并需要将对象移出显示队例
        public clearTemp($data: any): void {
            var temp: LabelTxtVo = this.getVoByData($data) as LabelTxtVo;
            temp.ui.removeEventListener(InteractiveEvent.Move, this.butMove, this);
            temp.ui.removeEventListener(InteractiveEvent.Down, this.onMouseUp, this);
            super.clearTemp($data);
        }
        private setColorByLevel(value: number): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                var menuListData: MenuListData = this._uiItem[i].data as MenuListData
                if (menuListData && menuListData.level == value) {
                    menuListData.select = false
                    this._uiItem[i].makeData()
                }
            }
        }
        private removeOtherSonMenu(level: number): void {

            for (var i: number = this._uiItem.length - 1; i >= 0; i--) {
                var $menuListData: MenuListData = this._uiItem[i].data as MenuListData
                if ($menuListData && $menuListData.level > level) {
                    this.clearTemp($menuListData)
                }
            }
        }
        protected butMove(evt: InteractiveEvent): void {
            var temp: LabelTxtVo = this.getVoByUi(evt.target) as LabelTxtVo;
            if (temp && temp.data) {
                var menuListData: MenuListData = temp.data
                this.setColorByLevel(menuListData.level);
                this.removeOtherSonMenu(menuListData.level);

                menuListData.select = true;
                temp.makeData();

                this.showSon(menuListData.subMenu, temp.ui.x, temp.ui.y + temp.ui.height)


            }
        }
        private bfun: Function
        protected onMouseUp(evt: InteractiveEvent): void {
            var temp: LabelTxtVo = this.getVoByUi(evt.target) as LabelTxtVo;
            if (temp && temp.data) {
                this.bfun(temp.data, evt)
                this.removeOtherSonMenu(0);
            }
        }
        private showSon(subMenu: Array<MenuListData>, tx: number, ty: number): void {

            for (var i: number = 0; subMenu && i < subMenu.length; i++) {
                var labelTxtVo: LabelTxtVo = this.getVoByData(subMenu[i]) as LabelTxtVo;
                if (!labelTxtVo) {
                    this.showTempMenu(subMenu[i], i, tx, ty);
                }

            }
        }

    }
}