/**
* name 
*/
module game.data.template {
    export class PetSkillConfigBaseVo {
        public id: number; //技能id
        public skillname: string; //技能名称
        public param: string; //技能消耗
        public costnum: number; //消耗数量
        public costType: number; //消耗属性编号
        public icon: number; //图标编号
        public skilltype: number; //主动被动
        public littledes: string; //短描述
        public skilldescribe: string; //技能描述
        public targettype: number; //目标类型
        public effectid: number; //魔法入口
        public score: number; //评分
        public color: number; //品质
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
			this.skillname = data.getUTFBytes(data.getUint32());
			this.param = data.getUTFBytes(data.getUint32());
			this.costnum = data.getUint32(); 
            this.costType = data.getUint32(); 
			this.icon = data.getUint32(); 
			this.skilltype = data.getUint32(); 
			this.littledes = data.getUTFBytes(data.getUint32()); 
			this.skilldescribe = data.getUTFBytes(data.getUint32()); 
			this.targettype = data.getUint32();
			this.effectid = data.getUint32(); 
			this.score = data.getUint32(); 
			this.color = data.getUint32();
        }
    }
}