﻿module baselaunch {

    import Browser = Laya.Browser;
    import Loader = Laya.Loader;
    import LEvent = Laya.Event;
    import Stage = Laya.Stage;
    import Sprite = Laya.Sprite


    import Pan3dByteArray = Pan3d.me.Pan3dByteArray;

    import LayaScene2D = LayaPan3D.LayaScene2D;

    import LayaGame2dDemo = LayaPan3D.LayaGame2dDemo;

    export  class LayaLaunch {
        private _canvas: HTMLCanvasElement;
        get canvas(): HTMLCanvasElement {
            return this._canvas;
        }
        constructor() {
            this.init()
        }
        static inited: boolean
        static overrideMethods(): void {
            if (this.inited) {
                return;
            }
            this.inited = true;
            let compatibleLayaRender = function (pan3dFunc: Function, ...args): any {
                let v = pan3dFunc.apply(this, args);

                //   console.log("here")
                return v;
            }
            let funA = WebGLRenderingContext.prototype.blendFunc;
            WebGLRenderingContext.prototype.blendFunc = function (sfactor: GLenum, dfactor: GLenum): void {
                return compatibleLayaRender.call(this, funA, sfactor, dfactor);
            }
            /*
            let ParticleBoneData_setAllByteInfo = Pan3d.ParticleBoneData.prototype.setAllByteInfo;
            Pan3d.ParticleBoneData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
                return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
            }
            */
        }


        private init(): void {
            // LayaLaunch.overrideMethods()

            this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
            Laya.stage.alignV = Stage.ALIGN_LEFT;
            Laya.stage.alignH = Stage.ALIGN_TOP;

            Laya.stage.scaleMode = "full"
            Laya.stage.bgColor = "#232628";



            Pan3d.me.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
            Pan3d.me.Scene_data.fileuiRoot = "res/";
            Pan3d.me.Scene_data.fileRoot = Pan3d.me.Scene_data.ossRoot + "baseedit/";



            Pan3d.me.Engine.init(this._canvas);


            var topBox: Laya.Box = new Laya.Box()
            Laya.stage.addChild(topBox)

            var midBox: Laya.Box = new Laya.Box()
            Laya.stage.addChild(midBox)

         


            var picA: Laya.Image = new Laya.Image("res/ui/icon/lyf_64x.png");
            Laya.stage.addChild(picA)
            picA.scale(0.5, 0.5)
            picA.pos(600, 170)


            var spriteC: LayaGame2dDemo = new LayaGame2dDemo("res/ui/icon/512a.jpg", () => {
                spriteC.scale(1, 1)
            })
            Laya.stage.addChild(spriteC);
            spriteC.pos(350, 0);


            var spriteD: LayaScene2D = new LayaGame2dDemo("res/ui/icon/512b.jpg", () => {
                spriteD.scale(2, 1)
            })
            Laya.stage.addChild(spriteD);
            spriteD.pos(200, 250);


            var picB: Laya.Image = new Laya.Image("res/ui/icon/lyf_64x.png");
            Laya.stage.addChild(picB)
            picB.pos(0, 220)

            this.lastTm = Pan3d.me.TimeUtil.getTimer()
            Laya.stage.frameLoop(1, this, () => {
                var t = Pan3d.me.TimeUtil.getTimer() - this.lastTm;
                //  Pan3d.TimeUtil.START_TIME += t * -1;
                this.lastTm = Pan3d.me.TimeUtil.getTimer()
                Pan3d.me.TimeUtil.update()
            })
        }


        private lastTm: number

        public static initCanvas($caves: HTMLCanvasElement): void {

            new LayaLaunch();


        }


    }


}