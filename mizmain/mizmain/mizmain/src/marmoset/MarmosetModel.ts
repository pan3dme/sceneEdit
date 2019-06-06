﻿module mars3D {
    import Scene_data = Pan3d.Scene_data
    import ByteStream = marmoset.ByteStream
    import Scene = marmoset.Scene
    import Matrix = marmoset.Matrix
    import Vect = marmoset.Vect
    
    export class FileVo {
        public name: string
        public type: string
        public data: Uint8Array
    }

    export class Mars3Dmesh extends marmoset.Mesh {
 
        private meshVect(value: Uint8Array, stride: number): ArrayBuffer {
            var buffer = new ArrayBuffer(value.length);
            var changeArr = new Uint8Array(buffer);
            var outArr = new Float32Array(buffer);
            for (var i: number = 0; i < value.length; i++) {
                changeArr[i] = value[i];
            }
            for (var i: number = 0; i < outArr.length / 8; i++) {
                var id: number = i * 8 + 0;
                 outArr[id] = outArr[id] * 0.5;
            }
            return outArr;

        }

        private meshVectNrm(value: Uint8Array, stride: number): Float32Array {

            var len: number = value.length / stride;
            var buffer = new ArrayBuffer(value.length);
            var changeArr = new Uint8Array(buffer);
            for (var i: number = 0; i < value.length; i++) {
                changeArr[i] = value[i];
            }
            var tbnArr = new Uint16Array(buffer);
            var nrmItem32Arr: Array<number> = [];
            var m: Pan3d.Matrix3D = new Pan3d.Matrix3D
            m.appendRotation(90, Pan3d.Vector3D.Z_AXIS)
            for (var i: number = 0; i < tbnArr.length / 16; i++) {//tbn
                var id: number = i * 16 + 10
                var a: number = tbnArr[id + 4]
                var b: number = tbnArr[id + 5]
 
                var outVec3: Vector3D = this.getNrmByXY(new Vector2D(a, b))
                nrmItem32Arr.push(outVec3.x, outVec3.y, outVec3.z)
            }

            return new Float32Array(nrmItem32Arr);


        }
        private getNrmByXY(v: Vector2D): Vector3D {

            v.x = v.x / 65535.0;
            v.y = v.y / 65535.0;
            var iX: boolean = (v.y > (32767.1 / 65535.0));
            v.y = iX ? (v.y - (32768.0 / 65535.0)) : v.y;
            var r: Vector3D = new Vector3D()
            r.x = (2.0 * 65535.0 / 32767.0) * v.x - 1.0;
            r.y = (2.0 * 65535.0 / 32767.0) * v.y - 1.0;
            r.z = Math.sqrt(Math.max(Math.min(1.0 - (r.x * r.x + r.y * r.y), 1.0), 0.0));
            r.z = iX ? -r.z : r.z;
            return r;
        }
 
        public nrmBuffer: WebGLBuffer;
        public initdata(a: any, b: any, c: any) {
            this.gl = a;
            var elementArrayBuffer = this.gl.getParameter(this.gl.ELEMENT_ARRAY_BUFFER_BINDING);
            var arrayBuffer = this.gl.getParameter(this.gl.ARRAY_BUFFER_BINDING);
 
            this.gl = a;
            this.desc = b;
            var d = b.isDynamicMesh;
            this.numSubMeshes = this.dynamicVertexData = 0;
            this.displayMatrix = Matrix.identity();
            this.name = b.name;
            this.modelMatrix = Matrix.identity();
            this.origin = b.transform ? Vect.create(b.transform[12], b.transform[13], b.transform[14], 1) : Vect.create(0, 5, 0, 1);
            this.stride = 32;
            if (this.vertexColor = b.vertexColor) {
                this.stride += 4;
            }
            if (this.secondaryTexCoord = b.secondaryTexCoord) {
                this.stride += 8;
            }
            c = new ByteStream(c.data);


            this.indexCount = b.indexCount;
            this.indexTypeSize = b.indexTypeSize;
            this.indexType = 4 == this.indexTypeSize ? a.UNSIGNED_INT : a.UNSIGNED_SHORT;
            this.indexBuffer = a.createBuffer();
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            var e = c.readBytes(this.indexCount * this.indexTypeSize);
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, e, a.STATIC_DRAW);
            this.wireCount = b.wireCount;
            this.wireBuffer = a.createBuffer();
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.wireBuffer);
            e = c.readBytes(this.wireCount * this.indexTypeSize);
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, e, a.STATIC_DRAW);
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null);
            this.vertexCount = b.vertexCount;


       
            c = c.readBytes(this.vertexCount * this.stride);

            var nrmBuff = this.meshVectNrm(c, this.stride);
            this.nrmBuffer = a.createBuffer();
            a.bindBuffer(a.ARRAY_BUFFER, this.nrmBuffer);
            a.bufferData(a.ARRAY_BUFFER, nrmBuff, a.STATIC_DRAW);

            c = this.meshVect(c, this.stride);
            this.vertexBuffer = a.createBuffer();
            a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer);
            a.bufferData(a.ARRAY_BUFFER, c, a.STATIC_DRAW);
            a.bindBuffer(a.ARRAY_BUFFER, null);
            this.bounds = void 0 === b.minBound || void 0 === b.maxBound ? {
                min: Vect.create(-10, -10, -10, 1),
                max: Vect.create(10, 10, -0, 1)
            } : {
                    min: Vect.create(b.minBound[0], b.minBound[1], b.minBound[2], 1),
                    max: Vect.create(b.maxBound[0], b.maxBound[1], b.maxBound[2], 1)
                };
            this.bounds.maxExtent = Math.max(Math.max(b.maxBound[0] - b.minBound[0], b.maxBound[1] - b.minBound[1]), b.maxBound[2] - b.minBound[2]);
            this.bounds.averageExtent = (b.maxBound[0] - b.minBound[0] + (b.maxBound[1] - b.minBound[1]) + (b.maxBound[2] - b.minBound[2])) / 3

            if (elementArrayBuffer) {
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
            }
            if (arrayBuffer) {
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, arrayBuffer);
            }
 
        }

    }

    export class MarmosetModel {
        private static _instance: MarmosetModel;
        public static getInstance(): MarmosetModel {
            if (!this._instance) {
                this._instance = new MarmosetModel();
            }
            return this._instance;
        }
        public static meshItem: Array<Mars3Dmesh>
        private static preaMeshFile(modeInfo: any, fileDic: any): void {
            if (!this.meshItem) {
                this.meshItem=[]
            }
            this.meshItem.push(new Mars3Dmesh(Scene_data.context3D.renderContext, modeInfo, fileDic[modeInfo.file]))

           
        }

        private overrideFun(): void {
            let marmosetFun = function (fun: Function, ...args): any {
                let v = fun.apply(this, args);
                return v;
            }
            let Scene_load = Scene.prototype.load;
            Scene.prototype.load = function (a: any): any {
                var fileDic: any = {};
                var sceneInfo: any
                for (var fileKey in a.files) {
                    var fileVo: FileVo = new FileVo();
                    fileVo.name = a.files[fileKey].name;
                    fileVo.type = a.files[fileKey].type;
                    fileVo.data = a.files[fileKey].data;
                    fileDic[fileVo.name] = fileVo
                    if (fileVo.name.indexOf("scene.json") != -1) {
                         sceneInfo  = JSON.parse((new ByteStream(fileVo.data)).asString());
                    }
                }
                let tempBack = marmosetFun.call(this, Scene_load, a)
                for (var g: number = 0; g < sceneInfo.meshes.length; ++g) {
                    MarmosetModel.preaMeshFile(sceneInfo.meshes[g], fileDic)
                }
                return tempBack;
            }
            let TextureCache_parseFile = marmoset.TextureCache.parseFile;
            marmoset.TextureCache.parseFile = function (a: any, b: any, c: any): void {
                var tempImg: any = new Image();
                var tempBlob = new Blob([a.data], {
                    type: a.type
                });
                var tempURL = URL.createObjectURL(tempBlob);
                tempImg.onload = function () {
                    URL.revokeObjectURL(tempURL);
                    var webGLTexture: WebGLTexture = Pan3d.TextureManager.getInstance().getImageDataTexture(tempImg);
                    MarmosetModel.getInstance().textureItem.push(webGLTexture);
                }
                tempImg.src = tempURL;
                TextureCache_parseFile.call(this, a, b,c);
                MarmosetModel.imgBolb[a.name] = new Blob([a.data], { type: "application/octet-binary" });
            }

            let Shader_build = marmoset.Shader.prototype.build;
            marmoset.Shader.prototype.build = function (a: string, b: string): void {
                //console.log("---------------------------------")
                //console.log(a.length, b.length)
                if (b.length == 18238) { //读取顶点和纹理着色器
                    a = MarmosetModel.changerVshader;
                    b = MarmosetModel.changerFshader;
                } else {
                    if (a.length == 212) {//更新输出着色器
                        b = MarmosetModel.changerOutshader;
                    }
                }

                Shader_build.call(this, a, b);
            }
 

        }
        public static changerVshader: string
        public static changerFshader: string
        public static changerOutshader: string
        private getTextShaderStr(): string {
            var str: string;
            str=""

            return str;
        }
        public upFileToSvever(): void {
            for (var key in MarmosetModel.imgBolb) {
                this.dataURLtoBlob(MarmosetModel.imgBolb[key], key)
            }
        }
        public static imgBolb: any;
     
 
        public dataURLtoBlob(value: Blob, name: string): void {

            //"image/jpeg"
            var img: any = new Image();
            img.url = name
            img.onload = (evt: Event) => {
                var etimg: any = evt.target;
                URL.revokeObjectURL(etimg.src);

                let files = new File([value], name, { type: "image/jpeg" })
 
                var pathUrl: string = Pan3d.Scene_data.fileRoot + "pan/marmoset/" + name;
                var pathurl: string = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");
                pack.FileOssModel.upOssFile(files, pathurl, (value: any) => {

                    console.log(value)

                })
 
            }
            img.src = URL.createObjectURL(value);


        }
        private dataURLtoFile(dataurl: string, filename: string): File {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }
  
        public textureItem: Array<WebGLTexture>;
        public constructor() {
            this.textureItem = []
            MarmosetModel.imgBolb = {};
        
        }
        public initData(): void {
            this.overrideFun()
 
        }
       
    }
}