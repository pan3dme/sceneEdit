declare module materialui {
    import Vector2D = Pan3d.me.Vector2D;
    class NodeTreeVec2 extends NodeTree {
        constValue: Vector2D;
        constructor();
        getComponentID($id: number): string;
    }
}