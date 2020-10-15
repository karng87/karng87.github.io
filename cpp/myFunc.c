#include<stdio.h>

int greater(int n1, int n2);

int main(){
  int a = 19;
  int b = 29;
  int ret;
  ret = greater(a,b);
  printf("Greater value is : %d\n",ret);
  getchar();
  return 0;
}

int greater(int n1, int n2){
  int result;
  if (n1>n2) result=n1;
  else result=n2;
  return result;
}
