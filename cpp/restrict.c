
void increase(int *a, int *b, int *x){
  *a += *x;
  *b += *x;
}

void restrictIncrease(int *restrict a, int *restrict b, int *restrict x){
  *a += *x;
  *b += *x;
}
