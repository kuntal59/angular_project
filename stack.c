#include <stdio.h>
#include "stack.h"

long int g_Stack[STACK_MAX];
int g_iTop = -1;

void Push(long int iData)
{
    if(IsFull())
    {
        printf("Stack overflow\n");
        return;
    }

    g_Stack[++g_iTop] = iData;
}

long int Pop(void)
{
    if(IsEmpty())
        return -1;

    return g_Stack[g_iTop--];
}

int IsFull(void)
{
    if(g_iTop == STACK_MAX - 1)
        return 1;
    return 0;
}

int IsEmpty(void)
{
    if(g_iTop == -1)
        return 1;
    return 0;
}
