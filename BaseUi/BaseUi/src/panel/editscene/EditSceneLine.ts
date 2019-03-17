﻿module editscene {
    import Rectangle = Pan3d.Rectangle
    import Sprite = layout.Sprite
    import LayBaseTab = layout.LayBaseTab

    import UICompenent = Pan3d.UICompenent
    import FrameCompenent = Pan3d.FrameCompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign
 
    import ModuleEventManager = Pan3d.ModuleEventManager
    import UIManager = Pan3d.UIManager
    import LabelTextFont = Pan3d.LabelTextFont
    import UIConatiner = Pan3d.UIConatiner;
    import Disp2DBaseText = Pan3d.Disp2DBaseText
    import UIRectangle = Pan3d.UIRectangle
    import baseMeshVo = Pan3d.baseMeshVo
    import UIMask = Pan3d.UIMask
    import UiDraw = Pan3d.UiDraw
    import UIData = Pan3d.UIData
    import UIAtlas = Pan3d.UIAtlas
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data


    export class TempLineSprite extends UIConatiner {

        public static imgBaseDic: any;
        public constructor() {
            super();

            this.left = 0;
            this._pageRect = new Rectangle(0, 0, 30, 300)

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._bottomRender.uiAtlas = new UIAtlas();
            this._bottomRender.uiAtlas.setInfo("ui/window/window.txt", "ui/window/window.png", () => { this.loadConfigCom() });

        }

        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        protected mouseDown(evt: InteractiveEvent): void {
            this.mouseIsDown = true
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        }
        private mouseIsDown: boolean
        protected stageMouseMove(evt: InteractiveEvent): void {
            this.mouseIsDown = false

        }
        protected mouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        }
        private loadFinish: boolean
        protected loadConfigCom(): void {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas

            this.lineBgPixe = this.addChild(<UICompenent>this._bottomRender.getComponent("b_line_pixe_point"));

            this.lineMoveEmpty = this.addChild(<UICompenent>this._topRender.getComponent("a_empty"));
            this.lineMoveEmpty.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);

            this.loadFinish = true

            this.refrishSize()



        }
        private lastPagePos: Vector2D;
        private lastMousePos: Vector2D;
        private mouseMoveTaget: UICompenent
        protected tittleMouseDown(evt: InteractiveEvent): void {

            this.mouseMoveTaget = evt.target
            this.lastMousePos = new Vector2D(evt.x, evt.y)

            switch (this.mouseMoveTaget) {
                case this.lineMoveEmpty:
                    this.lastPagePos = new Vector2D(this._pageRect.x,this._pageRect.y)
                    break
                default:
                    console.log("nonono")
                    break

            }
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
        protected tittleMouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
      
        protected mouseOnTittleMove(evt: InteractiveEvent): void {
            switch (this.mouseMoveTaget) {
                case this.lineMoveEmpty:
                    this._pageRect.x = this.lastPagePos.x + (evt.x - this.lastMousePos.x)
                    break
                default:
                    console.log("nonono")
                    break

            }
            var roundPos: Vector2D = (<EditSceneLine>this.perent).roundPos;
            this._pageRect.x = Math.max(this._pageRect.x, Scene_data.stageWidth * roundPos.x)
            this._pageRect.x = Math.min(this._pageRect.x, Scene_data.stageWidth * roundPos.y)
            this.refrishSize();

            (<EditSceneLine>this.perent).perent.resize();
        }
        protected butClik(evt: InteractiveEvent): void {
            console.log(evt.target)
        }
        public set pageRect(value: Rectangle) {
            this._pageRect = value;
            if (this.loadFinish) {
                this.refrishSize();
            }
        }
        public get pageRect() {
            return this._pageRect;

        }
        private _pageRect: Rectangle;
 
        private lineMoveEmpty: UICompenent
        private lineBgPixe: UICompenent
        
        private refrishSize(): void {

            this.left = this._pageRect.x;
            this.top = this._pageRect.y;

            this.lineMoveEmpty.x = 0;
            this.lineMoveEmpty.y = 0;
            this.lineMoveEmpty.height = this._pageRect.height;
            this.lineMoveEmpty.width = 5;

            this.lineBgPixe.x = 2;
            this.lineBgPixe.y = 0;
            this.lineBgPixe.height = this._pageRect.height;
            this.lineBgPixe.width = 1;

            this.resize();


        }


    }
    export class EditSceneLine extends Sprite {
        private winBg: TempLineSprite;
        public constructor(has: boolean = true) {
            super();

            if (has) {
                this.winBg = new TempLineSprite();
                this.addUIContainer(this.winBg)
                this.changeSize()
            }

        }
        public roundPos: Vector2D
        public changeSize(): void {
            if (this.winBg) {
                this.winBg.pageRect = this.rect

            }

        }
    }

    export class TempTopLaout extends base.BaseWindow {

        private leftLine: UICompenent;
        private rightLine: UICompenent;
        private bottomLine: UICompenent;
        protected loadConfigCom(): void {
            super.loadConfigCom();
 
 
            this.leftLine = this._baseTopRender.getComponent("b_line_pixe_point");
            this.rightLine = this._baseTopRender.getComponent("b_line_pixe_point");
            this.bottomLine = this._baseTopRender.getComponent("b_line_pixe_point");

            this.setUiListVisibleByItem([this.leftLine], true)
            this.setUiListVisibleByItem([this.rightLine], true)
            this.setUiListVisibleByItem([this.bottomLine], true)

            this.leftLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.rightLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.bottomLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);


            this.setRect(new Rectangle(0, 0, Scene_data.stageWidth, Scene_data.stageHeight))

            this.resize()

        }
        private leftWidth: number = 300 //左边宽度；
        private rightWidth: number = 300 //右边宽度；
        private bottomHeight: number = 300 //底下宽度；


        public resize(): void {

            super.resize()
            if (this.bottomLine) {

                this.leftLine.x = this.leftWidth
                this.leftLine.y = 0
                this.leftLine.width = 10
                this.leftLine.height = Scene_data.stageHeight

                this.rightLine.x = Scene_data.stageWidth - this.rightWidth
                this.rightLine.y = 0
                this.rightLine.width = 10
                this.rightLine.height = Scene_data.stageHeight

                this.bottomLine.x = 0
                this.bottomLine.y = Scene_data.stageHeight - this.bottomHeight
                this.bottomLine.width = Scene_data.stageWidth
                this.bottomLine.height = 10



                BaseUiStart.leftPanel.y = this.menuHeight;
                BaseUiStart.centenPanel.y = this.menuHeight;
                BaseUiStart.rightPanel.y = this.menuHeight;



                BaseUiStart.leftPanel.x = 0
                BaseUiStart.leftPanel.height = Scene_data.stageHeight - this.bottomHeight - this.menuHeight;
                BaseUiStart.leftPanel.width = this.leftWidth;



                BaseUiStart.rightPanel.x = Scene_data.stageWidth - this.rightWidth
                BaseUiStart.rightPanel.height = Scene_data.stageHeight - this.menuHeight;
                BaseUiStart.rightPanel.width = this.rightWidth;



                BaseUiStart.centenPanel.x = this.leftWidth
                BaseUiStart.centenPanel.height = Scene_data.stageHeight - this.bottomHeight - this.menuHeight
                BaseUiStart.centenPanel.width = Scene_data.stageWidth - this.leftWidth - this.rightWidth



                var rect: Rectangle = new Rectangle(0, Scene_data.stageHeight - this.bottomHeight + 10, Scene_data.stageWidth - this.rightWidth, this.bottomHeight);
                Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.EDITSCENE_RESET_SIZE), rect);
                Pan3d.ModuleEventManager.dispatchEvent(new EditSceneEvent(EditSceneEvent.EDITE_SCENE_RESIZE), rect);
            }

        }
        protected lastLaoutVec: Vector3D;
        protected tittleMouseDown(evt: InteractiveEvent): void {
            this.mouseMoveTaget = evt.target
            this.lastMousePos = new Vector2D(evt.x, evt.y)

        

            switch (this.mouseMoveTaget) {
                case this.leftLine:
                case this.rightLine:
                case this.bottomLine:
                    this.lastPagePos = new Vector2D(evt.target.x, evt.target.y)
                    this.lastLaoutVec = new Vector3D(this.leftWidth, this.rightWidth, this.bottomHeight);
                    break
                default:
 
                    break

            }
 
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
        private menuHeight: number = 22
        protected mouseOnTittleMove(evt: InteractiveEvent): void {
            switch (this.mouseMoveTaget) {
                case this.leftLine:
                    this.leftWidth = this.lastLaoutVec.x + (evt.x - this.lastMousePos.x)
                    break
                case this.rightLine:
                    this.rightWidth = this.lastLaoutVec.y - (evt.x - this.lastMousePos.x)
                    break
                case this.bottomLine:
                    this.bottomHeight = this.lastLaoutVec.z - (evt.y - this.lastMousePos.y)
                    break
                default:
                    console.log("nonono")
                    break

            }
            this.resize()


           

        }
       
    }

    export class SceneLaoutLinePane extends Sprite {
        private winBg: TempTopLaout;
        public constructor(has: boolean = true) {
            super();
 
            this.winBg = new TempTopLaout();
            this.addUIContainer(this.winBg)
            this.changeSize()
     

        }
 
       
    }
}

