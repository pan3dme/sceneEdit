declare module materialui {
    import TexItem = Pan3d.TexItem;
    import TextureCube = Pan3d.TextureCube;
    import Material = Pan3d.Material;
    import Shader3D = Pan3d.Shader3D;
    import ConstItem = Pan3d.ConstItem;
    class MaterialTree extends Material {
        private _data;
        showurl: string;
        zbuff: boolean;
        pointlight: boolean;
        private _compileData;
        private _url;
        shaderStr: string;
        laterTextureurl: string;
        laterTexture: MaterialTree;
        texList: Array<TexItem>;
        cubeTextItem: TextureCube;
        constList: Array<ConstItem>;
        hasTime: boolean;
        timeValue: Vector2D;
        blendMode: number;
        backCull: boolean;
        killNum: number;
        hasVertexColor: boolean;
        usePbr: boolean;
        useNormal: boolean;
        useUv: boolean;
        useLightUv: boolean;
        roughness: number;
        writeZbuffer: boolean;
        useDynamicIBL: boolean;
        normalScale: number;
        lightProbe: boolean;
        directLight: boolean;
        scaleLightMap: boolean;
        noLight: boolean;
        fogMode: number;
        useKill: boolean;
        hasAlpha: boolean;
        hasSkyBox: boolean;
        skyBoxTextId: number;
        materialBaseData: MaterialBaseData;
        fcNum: number;
        fcIDAry: Array<number>;
        modelShader: Shader3D;
        roleShader: Shader3D;
        data: any;
        setData(value: any): void;
        clone(): MaterialTree;
        compileData: any;
    }
}
