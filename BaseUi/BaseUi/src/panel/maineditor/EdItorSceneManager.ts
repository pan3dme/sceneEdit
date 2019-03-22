﻿module maineditor {
    import SceneManager = Pan3d.SceneManager
    import Scene_data = Pan3d.Scene_data
    import TimeUtil = Pan3d.TimeUtil
    import MathClass = Pan3d.MathClass
    import ParticleManager = Pan3d.ParticleManager
    import SkillManager = Pan3d.SkillManager
    import FBO = Pan3d.FBO
    import Engine = Pan3d.Engine
    import TextureRes = Pan3d.TextureRes
    import Camera3D = Pan3d.Camera3D
    import Object3D = Pan3d.Object3D
    import Matrix3D = Pan3d.Matrix3D

    export class EdItorSceneManager extends SceneManager {
        constructor() {
            super();
        }
        public fbo: FBO;
      //  private renderContext: WebGLRenderingContext;
 
        private updateDepthTexture(fbo: FBO): void {

            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);

            gl.viewport(0, 0, fbo.width, fbo.height);
            gl.clearColor(20 / 255, 20 / 255, 20 / 255, 1.0);
            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(true);
            gl.enable(gl.BLEND);
            gl.frontFace(gl.CW);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        }
    
   
        public renderToTexture( ): void {
            if (!this.fbo) {
                this.fbo = new FBO;
            } else {
                this.fbo.resetSize(this.cam3D.cavanRect.width, this.cam3D.cavanRect.height);
            }
            this.viewMatrx3D.identity();

            this.viewMatrx3D.perspectiveFieldOfViewLH(0.8, 1, 1, 2000);
            this.viewMatrx3D.appendScale(1, this.cam3D.cavanRect.width / this.cam3D.cavanRect.height, 1);
            var sceneViewHW: number = 400 / this.cam3D.cavanRect.width;

            this.viewMatrx3D.appendScale(sceneViewHW, sceneViewHW, 1);
 

            this.updateDepthTexture(this.fbo);

            this.update();

            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            Engine.resetSize();

            if (this.fbo && this.textureRes) {
                this.textureRes.texture = this.fbo.texture;
            }
        }
        public textureRes: Pan3d.TextureRes;
        public update(): void {
            var lastCam3D: Camera3D = Scene_data.cam3D
            var lastfocus3D: Object3D = Scene_data.focus3D
            var lastViewMatrx3D: Matrix3D = Scene_data.viewMatrx3D.clone() 
         
            Scene_data.cam3D = this.cam3D;
            Scene_data.focus3D = this.focus3D;
            Scene_data.viewMatrx3D = this.viewMatrx3D;
            MathClass.updateVp()
 
   
            Scene_data.context3D._contextSetTest.clear();
            if (isNaN(this._time)) {
                this._time = TimeUtil.getTimer();
            }
            if (this._ready) {
                Scene_data.context3D.cullFaceBack(true);
                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.setDepthTest(true);
                this.updateStaticDiplay();
                this.updateSpriteDisplay();
                this.updateMovieDisplay();
                Scene_data.context3D.setWriteDepth(false);
            }
            Scene_data.cam3D = lastCam3D;
            Scene_data.focus3D = lastfocus3D;
            Scene_data.viewMatrx3D = lastViewMatrx3D;
        }

    }

}