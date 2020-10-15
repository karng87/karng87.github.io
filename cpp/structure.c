#include <stdio.h>
#include <string.h>

struct Library {
  char BookTitle[50];
  char Author[50];
  int volume;
  float price;
};

int main(){
  struct Library lib;
  strcpy(lib.BookTitle,"Data Structure");
  strcpy(lib.Author, "Vinod Kumar");
  lib.volume = 1;
  lib.price = 12.1;

  struct Library lib1 = {"Jungle Book","Jim",3,120.3};
  struct Library lib2;

  printf("Enter Book Title:\n");
  //scanf("%[^\n]",lib2.BookTitle);
  int i,j;
  scanf("%*d%d",&i,&j);
  printf("i: %d === j: %d \n",i,j);
}
