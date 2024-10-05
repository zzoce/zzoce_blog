---
title: "快速求素数"
description: "两中方法：欧拉筛选以及埃氏筛选"
pubDate: Oct 04 2024
image: /image/index.webp
categories:
  - 数据结构与算法
tags:
  - 算法
badge: zzcoe
---


[P3912 素数个数 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P3912)
```Cpp
//欧拉筛选，比埃氏筛更优
#include <iostream>
#include <string>
#include <cstring>
#include <algorithm>
#include <cmath>
#include <map>
using namespace std;
int num[100000001];//存放素数
bool vis[100000001];//判断是否为素数,false为素数
long long int sum=0;
int main()
{
    memset(vis,false,sizeof (vis));
    memset (num,0,sizeof (num));
    int n,cnt=0;
    cin>>n;
    for (int i=2;i<=n;i++){
        if (vis[i]==false){
            num[cnt++]=i;//是质数则加入数组
            sum+=i;
        }
        for (int j=0;j<cnt && i*num[j]<=n;j++){
            vis[i*num[j]]=true;//标记为非质数
            if (i%num[j]==0){// 关键步骤：保证每个合数只被其最小质因数筛除
                break;
            }
        }
    }
    cout<<cnt;
    return 0;
}

//埃氏筛
#include<iostream>
using namespace std;
int main ()
{
	    int n,ans=0; 
	    bool isComp[100000005];  //是不是素数
	cin>>n;  
	isComp[1]=1; //1的特判  
	for(int i=2;i*i<=n;i++)  
	{  
	    if(isComp[i]==0) //如果是素数  
	    for(int j=i*i;j<=n;j+=i) //将他的倍数记为合数  
	    isComp[j]=1;  //标记  
	  
	}
    /*
    为什么是j=i*i;
    每个和数都可以表示为某几个素数的积。
    若有一个和数A有唯一的一个解，那他必是某个素数a的平方
    若有一个和数B，B<A那么B一定可以由小于a的某个素数的倍数来表示
    例如25 只能由5*5 来表示
    20可以有2*2*5表示（2<5）所以在求得2为素数时就已经将20标记为和数了，不需要再判断
    */
    for(int i=1;i<=n;i++)
    {
        if(isComp[i]==0)  //如果是素数
            ans++;
    }
    cout<<ans<<endl; //输出
    return 0;  //华丽结束
}
```