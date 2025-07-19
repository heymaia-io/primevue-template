export interface TreeNode {
    key: string;
    label: string;
    data: string;
    icon: string;
    children?: TreeNode[];
}

export interface TreeTableNode {
    key: string;
    data: {
        name: string;
        size: string;
        type: string;
    };
    children?: TreeTableNode[];
}
