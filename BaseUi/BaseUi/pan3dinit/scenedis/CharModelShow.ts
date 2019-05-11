﻿module scenedis.me {
    export class CharModelShow {
        constructor() {
            this.addModelChar()
        }
        private addModelChar(): void {


            var $sc: scenedis.me.ModelSceneChar = new scenedis.me.ModelSceneChar();
            $sc.setRoleUrl(getRoleUrl("50003"));
            $sc.setWingByID("901");
            $sc.setMountById("4103");
            $sc.setWeaponByAvatar(50011);
            $sc.play(Pan3d.me.CharAction.STAND_MOUNT);


            Pan3d.me. SceneManager.getInstance().addMovieDisplay($sc);



        }
    }
}