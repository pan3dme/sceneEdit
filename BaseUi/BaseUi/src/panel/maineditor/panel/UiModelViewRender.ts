﻿module maineditor {

    import Rectangle = Pan3d.me.Rectangle
    import Vector2D = Pan3d.me.Vector2D
    import Scene_data = Pan3d.me.Scene_data

    import UICompenent = Pan3d.me.UICompenent


    import TextureManager = Pan3d.me.TextureManager
    import FrameCompenent = Pan3d.me.FrameCompenent
    import UIRenderComponent = Pan3d.me.UIRenderComponent
    import ColorType = Pan3d.me.ColorType
    import InteractiveEvent = Pan3d.me.InteractiveEvent
    import TextAlign = Pan3d.me.TextAlign

    import ModuleEventManager = Pan3d.me.ModuleEventManager
    import UIManager = Pan3d.me.UIManager
    import LabelTextFont = Pan3d.me.LabelTextFont
    import UIConatiner = Pan3d.me.UIConatiner;
    import Disp2DBaseText = Pan3d.me.Disp2DBaseText
    import UIRectangle = Pan3d.me.UIRectangle
    import UIRenderOnlyPicComponent = Pan3d.me.UIRenderOnlyPicComponent
    import baseMeshVo = Pan3d.me.baseMeshVo
    import ProgrmaManager = Pan3d.me.ProgrmaManager
    import UIMask = Pan3d.me.UIMask
    import UiDraw = Pan3d.me.UiDraw
    import UIData = Pan3d.me.UIData
    import UIAtlas = Pan3d.me.UIAtlas
    import Shader3D = Pan3d.me.Shader3D
    import TextureRes = Pan3d.me.TextureRes
    import MouseType = Pan3d.me.MouseType
    import MathUtil = Pan3d.me.MathUtil
    import Material = Pan3d.me.Material
    import MaterialBaseParam = Pan3d.me.MaterialBaseParam
    import TimeUtil = Pan3d.me.TimeUtil

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
        private _sceneProjectVo: SceneProjectVo
        public set sceneProjectVo(value: SceneProjectVo) {
            if (value) {
                if (this._sceneProjectVo) {
                    this._sceneProjectVo.removeEventListener(Pan3d.me.BaseEvent.COMPLETE, this.sceneProjectUpData, this)
                }
                this._sceneProjectVo = value
                this._sceneProjectVo.addEventListener(Pan3d.me.BaseEvent.COMPLETE, this.sceneProjectUpData, this)
                this.sceneProjectUpData();
            }
        }
        private sceneProjectUpData(): void {
  
            pack.PackMaterialManager.getInstance().getMaterialByUrl(this._sceneProjectVo.textureurl, ($materialTree: materialui.MaterialTree) => {
                this.materialTree = $materialTree;
                var tempShader: UiModelViewShder = new UiModelViewShder;
                this.materialTree.shader = this.materialTree.modelShader;
                tempShader.fragment = this.materialTree.shader.fragment;
                tempShader.encode();
                this.uiProLocation = Scene_data.context3D.getLocation(tempShader.program, "ui")
                this.ui2ProLocation = Scene_data.context3D.getLocation(tempShader.program, "ui2")
                this.shader = tempShader;
                this.materialTree.shader = tempShader;//这里将材质设置到材质对象中，会有可能物件，人物，场景都引用。可能需要规避
            })
        }
        private time: number=0
        private materialTree: materialui.MaterialTree;
        public setMaterialVc($material: Material, $mp: MaterialBaseParam = null): void {
            if ($material.fcNum <= 0) {
                return;
            }
            var t: number = 0;
            if ($material.hasTime) {
                t = (TimeUtil.getTimer() - this.time) % 100000 * 0.001;
            }
            $material.update(t);
            if ($mp) {
                $mp.update();
            }
            Scene_data.context3D.setVc4fv(this.shader, "fc", $material.fcData);
        }
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
                    this.setMaterialVc(this.materialTree, this._sceneProjectVo.materialParam);
                } 
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }


        }
    }

}