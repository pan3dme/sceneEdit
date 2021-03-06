﻿
module LayaPan3D {
 
    import Shader3D = Pan3d.me.Shader3D
    import ProgrmaManager = Pan3d.me.ProgrmaManager
    import Matrix3D = Pan3d.me.Matrix3D
    import Scene_data = Pan3d.me.Scene_data
    import TextureManager = Pan3d.me.TextureManager
    import TextureRes = Pan3d.me.TextureRes
 

    export class LayaScene2dPicShader extends Shader3D {
        static LayaScene2dPicShader: string = "LayaScene2dPicShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "uniform vec4 rectinfo;" +
                "varying vec2 v_texCoord;" +

                "void main(void)" +
                "{" +
                    "v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                    "vec4 vt0= vec4(v3Position, 1.0);" +
                  "vt0.x = vt0.x *rectinfo.z+rectinfo.x;" +
                  "vt0.y = vt0.y *rectinfo.w-rectinfo.y;" +
                    "gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +

                "void main(void)\n" +
                "{\n" +
                    "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                    "gl_FragColor =infoUv;\n" +
                "}"
            return $str

        }

    }
    export class LayaScene2dPicSprit extends Pan3d.me.Display3D {
        constructor(value: string = null) {
            super();
            this.width = 100;
            this.height = 100;
            this.initData()
            if (value) {
                this.loadTextureByUrl(value);
            }

        }
        private static objdata2D: ObjData;
        protected initData(): void {
            if (!LayaScene2dPicSprit.objdata2D) {
                ProgrmaManager.getInstance().registe(LayaScene2dPicShader.LayaScene2dPicShader, new LayaScene2dPicShader);
                this.objData = new ObjData;
                this.objData.vertices = new Array();
                this.objData.vertices.push(0, 0, 0.9);
                this.objData.vertices.push(1, 0, 0.9);
                this.objData.vertices.push(1, -1, 0.9);
                this.objData.vertices.push(0, -1, 0.9);

                this.objData.uvs = new Array()
                this.objData.uvs.push(0, 0);
                this.objData.uvs.push(1, 0);
                this.objData.uvs.push(1, 1);
                this.objData.uvs.push(0, 1);

                this.objData.indexs = new Array();
                this.objData.indexs.push(0, 2, 1);
                this.objData.indexs.push(0, 3, 2);

                this.upToGpu()
                LayaScene2dPicSprit.objdata2D = this.objData;
            }
            this.shader = ProgrmaManager.getInstance().getProgram(LayaScene2dPicShader.LayaScene2dPicShader);
            this.objData = LayaScene2dPicSprit.objdata2D 
        }
        public width: number;
        public height: number;
        public updateMatrix(): void {
            if (this.width && this.height && this._scene) {


                var fvw: number = this._scene.cam3D.cavanRect.width;
                var fvh: number = this._scene.cam3D.cavanRect.height;
               var  $num45 = Math.abs(this._scene.focus3D.rotationX);
   
                var tx: number = (this._scene.focus3D.x - fvw / this._scene.cam3D.scene2dScale)  
                tx = this._x - tx * ( this._scene.cam3D.scene2dScale /2 )
 
                var ty: number=  this._scene.focus3D.z - (fvh / this._scene.cam3D.scene2dScale) / (Math.sin($num45 * Math.PI / 180)) * -1;
                ty = (ty * (Math.sin($num45 * Math.PI / 180)))  

                ty = this._y + ty * (this._scene.cam3D.scene2dScale / 2)
 
                this.imgRectInfo[0] = -1 + tx / fvw* 2;
                this.imgRectInfo[1] = -1 + ty / fvh * 2;
                this.imgRectInfo[2] = this.width / fvw*2  ;
                this.imgRectInfo[3] = this.height / fvh*2  
            }
        }
        public set2dPos($x: number, $y: number): void {
            this.x = $x;
            this.y = $y;
        }

        private loadTextureByUrl(url: string): void {
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + url, ($texture: TextureRes) => {
                this._uvTextureRes = $texture;
            });
       
        }
        public _uvTextureRes: TextureRes
        public upToGpu(): void {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        }
        public imgRectInfo: Array<number> = [0, 0, 1, 1]
        public update(): void {
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
                this.updateMatrix()
                Scene_data.context3D.setProgram(this.shader.program);
                Scene_data.context3D.setVc4fv(this.shader, "rectinfo", this.imgRectInfo);
 
      
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

           
            }
        }

    }
    export class LayaScene2dSceneChar extends Pan3d.me.Display3dMovie {

        private posv2: Vector2D
        public set2dPos($x: number, $y: number): void {
            this.posv2 = new Vector2D($x, $y)
            var $nScale: number = 1;
            var $num45: number = 45;
            if (this._scene) {
                $nScale = 2 / this._scene.cam3D.scene2dScale;
                $num45 = Math.abs(this._scene.focus3D.rotationX);
            } else {
                console.log("没有添加到场景算出来的坐标不确定是否正确")
            }
            var $tx: number = $x * $nScale;
            var $tz: number = $y * $nScale / (Math.sin($num45 * Math.PI / 180)) * -1;
            this.x = $tx;
            this.z = $tz;
        }
        public addStage(): void {
            super.addStage()
            if (this.posv2) {
                this.set2dPos(this.posv2.x, this.posv2.y);
            }
        }
       
    }
    export class LayaScene2D extends Laya3dSprite {

      
        public  rootpos: Vector2D
       
        public get scene2dScale(): number {
            return this.sceneManager.cam3D.scene2dScale;
        }
        protected initScene(): void {
            super.initScene();
            this.sceneManager.focus3D.rotationX = -30;
            this.sceneManager.focus3D.rotationY = 0;

          
        }
        //2d透视位移
        public upData(): void {
            if (this.sceneManager) {
                var fvw: number = this.sceneManager.cam3D.cavanRect.width
                var fvh: number = this.sceneManager.cam3D.cavanRect.height
                this.sceneManager.focus3D.x = fvw / this.scene2dScale;
                var $num45: number = Math.abs(this.sceneManager.focus3D.rotationX);//45度角
                this.sceneManager.focus3D.z = (fvh / this.scene2dScale) / (Math.sin($num45 * Math.PI / 180)) * -1;
                if (this.rootpos) {
                    this.sceneManager.focus3D.x += (this.rootpos.x   / this.scene2dScale * 2);
                    this.sceneManager.focus3D.z += (this.rootpos.y  / this.scene2dScale * 2) / (Math.sin($num45 * Math.PI / 180)) * -1  
                }
                Pan3d.me.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                super.upData()

            }
        }
        //获取鼠标位置
        protected getMousePos(tx: number, ty: number): Vector2D {
            var mousePos: Vector2D = new Vector2D(tx * this.scaleX , ty * this.scaleY  );
            var $num45: number = Math.abs(this.sceneManager.focus3D.rotationX);//45度角
            var toX: number = (mousePos.x + this.rootpos.x  );
            var toY: number = (mousePos.y  + this.rootpos.y ) * (Math.sin($num45 * Math.PI / 180)) * 2;
            return new Vector2D(toX  , toY );

        }
        //通过2D坐标得到3D坐标
        public getPos3dBy2D($x: number, $y: number): Vector3D {
            var $nScale: number = 1;
            var $num45: number = 45;
            if (this.sceneManager) {
                $nScale = 2 / this.sceneManager.cam3D.scene2dScale;
                $num45 = Math.abs(this.sceneManager.focus3D.rotationX);
            } else {
                console.log("没有添加到场景算出来的坐标不确定是否正确")
            }
          //  var $tx: number = $x * $nScale;
          //  var $tz: number = $y * $nScale / (Math.sin($num45 * Math.PI / 180)) * -1;
            return new Vector3D($x * $nScale,0, $y * $nScale / (Math.sin($num45 * Math.PI / 180)) * -1)
        }
        //更换上2D透视矩阵
        protected renderToTexture(): void {
            var m: Matrix3D = new Matrix3D
            var tw: number = this.sceneManager.cam3D.cavanRect.width
            var th: number = this.sceneManager.cam3D.cavanRect.height
            m.appendScale(1 / tw, 1 / th, 1 / 2000);
            m.appendScale(this.scene2dScale, this.scene2dScale, 1);
            this.sceneManager.renderToTexture(m);

        }

    }
}