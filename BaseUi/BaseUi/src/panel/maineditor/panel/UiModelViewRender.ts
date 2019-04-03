﻿module maineditor {

    import Rectangle = Pan3d.Rectangle
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data

    import UICompenent = Pan3d.UICompenent


    import TextureManager = Pan3d.TextureManager
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
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent
    import baseMeshVo = Pan3d.baseMeshVo
    import ProgrmaManager = Pan3d.ProgrmaManager
    import UIMask = Pan3d.UIMask
    import UiDraw = Pan3d.UiDraw
    import UIData = Pan3d.UIData
    import UIAtlas = Pan3d.UIAtlas
    import Shader3D = Pan3d.Shader3D
    import TextureRes = Pan3d.TextureRes
    import MouseType = Pan3d.MouseType
    import MathUtil = Pan3d.MathUtil

    import PanDragEvent = drag.PanDragEvent

    import Sprite = win.Sprite
    import Panel = win.Panel

    export class UiModelViewShder extends Shader3D {
        static UiModelViewShder: string = "UiModelViewShder";
        constructor() {
            super();

        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +
                "uniform vec4 ui[50];" +
                "uniform vec4 ui2[50];" +
                "varying vec2 v0;" +
                "void main(void)" +
                "{" +
                "   vec4 data = ui2[int(v2uv.z)];" +
                "   v0 = vec2(v2uv.x * data.x + data.z, v2uv.y * data.y + data.w);" +
                "   data = ui[int(v2uv.z)];" +
                "   vec3 pos = vec3(0.0,0.0,0.0);" +
                "   pos.xy = v3Pos.xy * data.zw * 2.0;" +
                "   pos.x += data.x * 2.0 - 1.0;" +
                "   pos.y += -data.y * 2.0 + 1.0;" +
                "   vec4 vt0= vec4(pos, 1.0);" +
                "   gl_Position = vt0;" +
                "}"
            return $str


        }

        /*
         
precision mediump float;
uniform sampler2D fs0;
varying vec2 v0;
varying highp vec3 vPos;
uniform vec3 cam3DPos;
void main(void){
vec4 ft0 = texture2D(fs0,v0);
vec4 ft1 = vec4(ft0.xyz,1.0);
vec4 ft2 = vec4(0,0,0,1);
ft2.xyz = ft1.xyz;
ft2.w = 1.0;
gl_FragColor = ft2;

}
         */
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D fs0;\n" +
                "varying vec2 v0;\n" +
                "void main(void){\n" +

                "vec4 ik=texture2D(fs0,v0);\n" +

                "gl_FragColor=vec4(ik.x,ik.x,ik.x,1.0);\n" +


                "}"
            return $str

        }

    }

    export class UiModelViewRender extends UIRenderOnlyPicComponent {
        public constructor() {
            super();

        }
       
        protected uiProLocation: WebGLUniformLocation;
        protected ui2ProLocation: WebGLUniformLocation;
        protected initData(): void {
            this._uiList = new Array;

            this.objData = new ObjData();
            ProgrmaManager.getInstance().registe(UiModelViewShder.UiModelViewShder, new UiModelViewShder)
            this.shader = ProgrmaManager.getInstance().getProgram(UiModelViewShder.UiModelViewShder);
            this.program = this.shader.program;

            this.uiProLocation = Scene_data.context3D.getLocation(this.program, "ui")
            this.ui2ProLocation = Scene_data.context3D.getLocation(this.program, "ui2")


        }
        public makeRenderDataVc($vcId: number): void {
            super.makeRenderDataVc($vcId);
            for (var i: number = 0; i < this.renderData2.length / 4; i++) {
                this.renderData2[i * 4 + 0] = 1;
                this.renderData2[i * 4 + 1] = -1;
                this.renderData2[i * 4 + 2] = 0;
                this.renderData2[i * 4 + 3] = 0;
            }
        }
        public set textureurl(value: string) {
           
            pack.PackMaterialManager.getInstance().getMaterialByUrl(value, ($materialTree: materialui.MaterialTree) => {
                this.materialTree = $materialTree;
                var tempShader: UiModelViewShder = new UiModelViewShder;

                tempShader.fragment = this.materialTree.shader.fragment;
                tempShader.encode();
                this.uiProLocation = Scene_data.context3D.getLocation(tempShader.program, "ui")
                this.ui2ProLocation = Scene_data.context3D.getLocation(tempShader.program, "ui2")
                this.shader = tempShader;

                this.materialTree.shader = tempShader;//这里将材质设置到材质对象中，会有可能物件，人物，场景都引用。可能需要规避
            })
           
        }
        private materialTree: materialui.MaterialTree;
   
        public update(): void {
            if (this.visible && this._uiList.length) {
                Scene_data.context3D.setBlendParticleFactors(this.blenderMode);
                Scene_data.context3D.setProgram(this.shader.program);

                Scene_data.context3D.setVc4fvLocation(this.uiProLocation, this.renderData);
                Scene_data.context3D.setVc4fvLocation(this.ui2ProLocation, this.renderData2);

                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);


                Scene_data.context3D.setRenderTexture(this.shader, "fs0", this.texture, 0);

                if (this.materialTree) {
                    Scene_data.context3D.setVc4fv(this.shader, "fc", this.materialTree.fcData);
                } 

                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }


        }
    }

}