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
var mars3D;
(function (mars3D) {
    var Scene_data = Pan3d.Scene_data;
    var Shader3D = Pan3d.Shader3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var GlReset = Pan3d.GlReset;
    var Matrix3D = Pan3d.Matrix3D;
    var MarFBO = /** @class */ (function (_super) {
        __extends(MarFBO, _super);
        function MarFBO(w, h) {
            if (w === void 0) { w = 128; }
            if (h === void 0) { h = 128; }
            return _super.call(this, w, h) || this;
        }
        return MarFBO;
    }(Pan3d.FBO));
    mars3D.MarFBO = MarFBO;
    var MarmosetLightVoShader = /** @class */ (function (_super) {
        __extends(MarmosetLightVoShader, _super);
        function MarmosetLightVoShader() {
            return _super.call(this) || this;
        }
        MarmosetLightVoShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "vPosition");
        };
        MarmosetLightVoShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 vPosition;" +
                "uniform mat4 viewMatrix3D;" +
                "varying vec2 jG; \n" +
                "void main(void)" +
                "{" +
                "vec4 vt0= vec4(vPosition, 1.0);" +
                "vt0 = viewMatrix3D * vt0;" +
                "gl_Position = vt0;" +
                "jG=gl_Position.zw;" +
                "}";
            return $str;
        };
        MarmosetLightVoShader.prototype.getFragmentShaderString = function () {
            var $str = "precision highp  float;\n" +
                "varying vec2 jG; \n" +
                "vec3 jH(float v){\n" +
                "vec4 jI = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\n" +
                "jI = fract(jI);\n" +
                "jI.xyz -= jI.yzw * (1.0 / 255.0);\n" +
                "return jI.xyz;\n" +
                "} \n" +
                "vec4 pack (float depth) {\n" +
                " vec4 bitShift = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);\n" +
                " vec4 bitMask = vec4(1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0, 0.0);\n" +
                "vec4 rgbaDepth = fract(depth * bitShift);  \n" +
                "rgbaDepth -= rgbaDepth.gbaa * bitMask;  \n" +
                "return rgbaDepth;\n" +
                "}\n" +
                "float unpack( vec4 rgbaDepth) {" +
                " vec4 bitShift = vec4(1.0, 1.0 / 256.0, 1.0 / (256.0 * 256.0), 1.0 / (256.0 * 256.0 * 256.0));" +
                "return dot(rgbaDepth, bitShift);" +
                "}" +
                "void main(void) " +
                "{ " +
                // "gl_FragColor.xyz=jH((jG.x/jG.y)*0.5+0.5); " +
                //   "float tempz =0.2340 ;"+
                //  "gl_FragColor = pack(gl_FragCoord.z); " +
                "gl_FragColor =vec4(1.0,0.0,0.0,0.5); " +
                //        "gl_FragColor.w=1.0; " +
                "}";
            return $str;
        };
        MarmosetLightVoShader.MarmosetLightVoShader = "MarmosetLightVoShader";
        return MarmosetLightVoShader;
    }(Shader3D));
    mars3D.MarmosetLightVoShader = MarmosetLightVoShader;
    var MarmosetLightVo = /** @class */ (function () {
        function MarmosetLightVo() {
            this.depthFBO = new MarFBO(1024, 1024);
            this.depthFBO.color = new Vector3D(1, 1, 1, 1);
            ProgrmaManager.getInstance().registe(MarmosetLightVoShader.MarmosetLightVoShader, new MarmosetLightVoShader);
            this.shader = ProgrmaManager.getInstance().getProgram(MarmosetLightVoShader.MarmosetLightVoShader);
            var gl = Scene_data.context3D.renderContext;
            var depthTexture = gl.createTexture(); //创建深度贴图
            gl.bindTexture(gl.TEXTURE_2D, depthTexture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, 1024, 1024, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
            this.depthFBO.depthTexture = depthTexture;
            // alert(gl.getExtension("WEBGL_depth_texture"))
        }
        MarmosetLightVo.prototype.updateDepthTexture = function (fbo) {
            var gl = Scene_data.context3D.renderContext;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
            //  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);
            //  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthFBO.depthTexture ,0)
            gl.viewport(0, 0, fbo.width, fbo.height);
            gl.clearColor(fbo.color.x, fbo.color.y, fbo.color.z, fbo.color.w);
            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(true);
            gl.enable(gl.BLEND);
            gl.frontFace(gl.CW);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        };
        MarmosetLightVo.prototype.update = function (value) {
            if (value && value.length) {
                var gl = Scene_data.context3D.renderContext;
                GlReset.saveBasePrarame(gl);
                this.updateDepthTexture(this.depthFBO);
                for (var i = 0; i < value.length; i++) {
                    this.drawTempMesh(value[i]);
                }
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.bindTexture(gl.TEXTURE_2D, null);
                gl.bindRenderbuffer(gl.RENDERBUFFER, null);
                GlReset.resetBasePrarame(gl);
            }
        };
        MarmosetLightVo.prototype.drawTempMesh = function (mesh) {
            if (mesh.tAlbedo && mesh.tNormal && mesh.tReflectivity) {
                Pan3d.Scene_data.context3D.setWriteDepth(true);
                Pan3d.Scene_data.context3D.setDepthTest(true);
                Pan3d.Scene_data.context3D.setBlendParticleFactors(0);
                var gl = Scene_data.context3D.renderContext;
                Scene_data.context3D.setProgram(this.shader.program);
                if (!this.depthFBO.depthViewMatrix3D) {
                    this.depthFBO.depthViewMatrix3D = window["mview"];
                }
                var tempM = new Matrix3D();
                for (var kt = 0; kt < tempM.m.length; kt++) {
                    tempM.m[kt] = MarmosetLightVo.marmosetLightVo.depthFBO.depthViewMatrix3D[kt];
                }
                //  console.log(tempM.transformVector(new Vector3D(2, 0, 0)))
                //   this.pack(0.254)
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", this.depthFBO.depthViewMatrix3D);
                gl.disable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT);
                Scene_data.context3D.setVa(0, 3, mesh.objData.vertexBuffer);
                Scene_data.context3D.drawCall(mesh.objData.indexBuffer, mesh.objData.treNum);
            }
        };
        return MarmosetLightVo;
    }());
    mars3D.MarmosetLightVo = MarmosetLightVo;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=MarmosetLightVo.js.map