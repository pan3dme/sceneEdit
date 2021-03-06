﻿module materialleft {
    import UICompenent = Pan3d.me.UICompenent
    import FrameCompenent = Pan3d.me.FrameCompenent
    import UIRenderComponent = Pan3d.me.UIRenderComponent
    import ColorType = Pan3d.me.ColorType
    import InteractiveEvent = Pan3d.me.InteractiveEvent
    import TextAlign = Pan3d.me.TextAlign
    import Rectangle = Pan3d.me.Rectangle
    import ModuleEventManager = Pan3d.me.ModuleEventManager
    import UIManager = Pan3d.me.UIManager
    import LabelTextFont = Pan3d.me.LabelTextFont
    import UIConatiner = Pan3d.me.UIConatiner;
    import Disp2DBaseText = Pan3d.me.Disp2DBaseText
    import UIRectangle = Pan3d.me.UIRectangle
    import baseMeshVo = Pan3d.me.baseMeshVo
    import MouseType = Pan3d.me.MouseType
    import ByteArray = Pan3d.me.Pan3dByteArray
    import UIRenderOnlyPicComponent = Pan3d.me.UIRenderOnlyPicComponent;

    import ModelShowModel = left.ModelShowModel

    import UIMask = Pan3d.me.UIMask
    import UiDraw = Pan3d.me.UiDraw
    import UIData = Pan3d.me.UIData
    import UIAtlas = Pan3d.me.UIAtlas
    import ObjData = Pan3d.me.ObjData
    import Shader3D = Pan3d.me.Shader3D
    import ProgrmaManager = Pan3d.me.ProgrmaManager
    import Scene_data = Pan3d.me.Scene_data
    import Vector2D = Pan3d.me.Vector2D

    import Panel = win.Panel
    

    export class MaterialLeftPanel extends win.BaseWindow {

        public only: boolean = true //标记需要移除
        public constructor() {
            super();
     
   
            this.addPojectView();
            this.initView();
        }
        public propPanle: prop.UiMeshSprite;
        private materiaMeshView: MateriaMeshView
        private addPojectView(): void {
            this.propPanle = new prop.UiMeshSprite();
            this.materiaMeshView = new MateriaMeshView(this.propPanle);
            this.propPanle.addMeshView(this.materiaMeshView)
        }
        private _materialTree: materialui.MaterialTree
        public set materialTree(value: materialui.MaterialTree) {
            this._materialTree = value;
            this.materiaMeshView.data = this._materialTree;
        }
        protected loadConfigCom(): void {
            super.loadConfigCom();
            this.setUiListVisibleByItem([this.e_panel_1], true)
 
        
        }
        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.b_win_close) {
                this.perent.removeUIContainer(this)
            }
        }
  
    
 
 
        private initView(): void {
 
            ModelShowModel.getInstance().addBaseModel()

 
            this.resize();
         
 
        }
       
        public resize(): void {

            var panel: Panel = <Panel>this.perent;
            if (panel) {
                this.pageRect.x = panel.x
                this.pageRect.y = panel.y;
                this.pageRect.width = panel.width
                this.pageRect.height = panel.height
            }
            super.resize()
            if (this.uiLoadComplete) {
                this.propPanle.resize()
 
            }

       
      
        }
   
 
        private _inputHtmlSprite: HTMLInputElement
        protected selectInputDae(evt: InteractiveEvent): void {


            this._inputHtmlSprite = <HTMLInputElement>document.createElement('input');
            this._inputHtmlSprite.setAttribute('id', '_ef');
            this._inputHtmlSprite.setAttribute('type', 'file');
            this._inputHtmlSprite.setAttribute("style", 'visibility:hidden');
            this._inputHtmlSprite.click();
            this._inputHtmlSprite.value;
            this._inputHtmlSprite.addEventListener("change", (cevt: any) => { this.changeFile(cevt) });


        }
        private changeFile(evt: any): void {
            for (var i: number = 0; i < this._inputHtmlSprite.files.length && i < 1; i++) {
                var simpleFile: File = <File>this._inputHtmlSprite.files[i];
                if (!/image\/\w+/.test(simpleFile.type)) {
                    var $reader: FileReader = new FileReader();

                    if (simpleFile.name.indexOf(".md5mesh") != -1) {

                        $reader.readAsText(simpleFile);
                        $reader.onload = ($temp: Event) => {
                            ModelShowModel.getInstance().webmd5Sprite.addLocalMeshByStr(<string>$reader.result)
                        }
                        return
                    }
                    if (simpleFile.name.indexOf(".md5anim") != -1) {

                        $reader.readAsText(simpleFile);
                        $reader.onload = ($temp: Event) => {
                            ModelShowModel.getInstance().webmd5Sprite.addLocalAdimByStr(<string>$reader.result)

                            ModelShowModel.getInstance().changeWebModel();
                        }
                        return
                    }
                    if (simpleFile.name.indexOf("objs.txt") != -1) {
                        $reader.readAsText(simpleFile);
                        $reader.onload = ($temp: Event) => {
                            ModelShowModel.getInstance().readTxtToModelBy(<string>$reader.result)
                        }
                    } else {
                        // alert("objs.txt结尾对象0" + simpleFile.name);
                        $reader.readAsArrayBuffer(simpleFile);
                        $reader.onload = ($temp: Event) => {
                            if (this.isRoleFile(<ArrayBuffer>$reader.result)) {
                                console.log("是角色", simpleFile.name)
                                pack.RoleChangeModel.getInstance().loadLocalFile(<ArrayBuffer>$reader.result, null)
                                left.SceneRenderToTextrue.getInstance().viweLHnumber = 1000
                            } else {
                                alert("不确定类型");
                            }
                        }

                    }
                } else {
                    alert("请确保文件类型为图像类型");
                }
            }
            this._inputHtmlSprite = null;
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





    }
}