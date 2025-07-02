#include <stdio.h>
#include <malloc.h>
#include "queue.h"

struct node
{
struct node *pLeft;
int iData;
struct node *pRight;
};

int main(void)
{
struct node *pPtr = NULL;
struct node *pRoot = NULL;

InsertBST(&pRoot, 100);
InsertBST(&pRoot, 45);
InsertBST(&pRoot, 121);
InsertBST(&pRoot, 150);
InsertBST(&pRoot, 9);
InsertBST(&pRoot, 130);
InsertBST(&pRoot, 50);
InsertBST(&pRoot, 170);

printf("Preorder is:\n");
Preorder(pRoot); // 100 45 9 50 121 150 130 170

printf("Inorder is:\n");
Inorder(pRoot); // 9 45 50 100 121 130 150 170 

printf("Postorder is:\n");
Postorder(pRoot); // 9 50 45 130 170 150 121 100

printf("Levelorder is:\n");
Levelorder(pRoot); // 100 45 121 9 50 150 130 170

printf("Node count is %d\n", CountNodesV1(pRoot)); // 8
printf("Node count is %d\n", CountNodesV2(pRoot)); // 8

printf("Leaf node count is %d\n", LeafNodeCount(pRoot)); // 4
printf("Nonleaf node count is %d\n", NonLeafNodeCount(pRoot)); // 4

printf("Height of tree is %d\n", Height(pRoot)); // 4

printf("Largest element is %d\n", LargestBST(pRoot)); // 170
printf("Smallest element is %d\n", SmallestBST(pRoot)); // 9

pPtr = SearchBSTRecursive(pRoot, 50);
if(pPtr != NULL)
printf("%d found at %d address\n", pPtr->iData, pPtr);

pPtr = SearchBSTNonRecursive(pRoot, 50);
if(pPtr != NULL)
printf("%d found at %d address\n", pPtr->iData, pPtr);

DeleteBST(&pRoot, 50);
Levelorder(pRoot); // 100 45 121 9 150 130 170

DeleteBST(&pRoot, 121);
Levelorder(pRoot); // 100 45 150 9 130 170

DeleteBST(&pRoot, 150);
Levelorder(pRoot); // 

if(pRoot != NULL)
{
DeleteAll(&pRoot);
pRoot = NULL;
}

return 0;
}
