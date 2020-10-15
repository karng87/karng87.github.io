#include <stdio.h>

void swap(int* xp, int* yp){
  int temp;
  temp = *xp;
  *xp = *yp;
  *yp = temp;
}
int main(){
  int n1 = 10, n2=20;
  printf("\nBefore swap value of n1:%d",n1);
  printf("\nBefore swap value of n2:%d",n2);
  swap(&n1,&n2);
  printf("\nAfter swap value of n1:%d",n1);
  printf("\nAfter swap value of n2:%d",n2);
  getchar();
}
