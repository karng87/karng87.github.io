#include <stdio.h>

int sum(int n1, int n2);
int main (){
  int ans;
  int n1= 100;
  int n2= 500;
  ans = sum(n1,n2);
  printf("The sum of two nums is : %d/\n",ans);
  getchar();
}

int sum(n1,n2){
  return n1+n2;
}
