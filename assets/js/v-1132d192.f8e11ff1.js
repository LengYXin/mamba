"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[444],{6924:(n,s,a)=>{a.r(s),a.d(s,{default:()=>e});const p=(0,a(6252).uE)('<h1 id="system" tabindex="-1"><a class="header-anchor" href="#system" aria-hidden="true">#</a> System</h1><details class="custom-container details"><summary>点击查看代码</summary><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token doc-comment comment">/**\n * <span class="token keyword">@author</span> 冷 (https://github.com/LengYXin)\n * <span class="token keyword">@email</span> lengyingxin8966@gmail.com\n * <span class="token keyword">@create</span> date 2021-08-16 18:31:26\n * <span class="token keyword">@modify</span> date 2021-08-16 18:31:26\n * <span class="token keyword">@desc</span> [description]\n */</span>\n<span class="token keyword">import</span> lodash <span class="token keyword">from</span> <span class="token string">&#39;lodash&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> BindAll <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;lodash-decorators&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> BaseModel <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../bases/baseModel&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token keyword">of</span><span class="token punctuation">,</span> delay<span class="token punctuation">,</span> Subject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rxjs&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Encryption <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../../helpers/encryption&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> computed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;mobx&#39;</span><span class="token punctuation">;</span>\n<span class="token decorator"><span class="token at operator">@</span><span class="token function">BindAll</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">SystemController</span> <span class="token punctuation">{</span>\n    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">onVerify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token doc-comment comment">/**\n     * 用户信息\n     * <span class="token keyword">@memberof</span> SystemController\n     */</span>\n    <span class="token keyword">readonly</span> User <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BaseModel</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">&#39;object&#39;</span><span class="token punctuation">,</span> storageKey<span class="token operator">:</span> <span class="token string">&#39;_le_user&#39;</span><span class="token punctuation">,</span> storageLoading<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token doc-comment comment">/**\n     * 菜单信息\n     * <span class="token keyword">@memberof</span> SystemController\n     */</span>\n    <span class="token keyword">readonly</span> Menu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BaseModel</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">&quot;list&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token doc-comment comment">/**\n     * 用户异步数据加载订阅\n     * <span class="token keyword">@type</span> <span class="token punctuation">{</span>Promise&lt;any&gt;<span class="token punctuation">}</span>\n     * <span class="token keyword">@memberof</span> ControllerUser\n     */</span>\n    <span class="token keyword">readonly</span> UserSubject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Subject</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">get</span> <span class="token function">AccessToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> lodash<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>User<span class="token punctuation">.</span>value<span class="token punctuation">,</span> <span class="token string">&#39;access_token&#39;</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token doc-comment comment">/**\n     * 登陆状态\n     * <span class="token keyword">@readonly</span>\n     * <span class="token keyword">@memberof</span> SystemController\n     */</span>\n    <span class="token decorator"><span class="token at operator">@</span><span class="token function">computed</span></span>\n    <span class="token keyword">get</span> <span class="token function">LoginIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>User<span class="token punctuation">.</span>loading<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token boolean">false</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> <span class="token operator">!</span>lodash<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>AccessToken<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token doc-comment comment">/**\n     * 登陆\n     * <span class="token keyword">@param</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span> formData\n     * <span class="token keyword">@return</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span> \n     * <span class="token keyword">@memberof</span> SystemController\n     */</span>\n    <span class="token keyword">async</span> <span class="token function">onLogin</span><span class="token punctuation">(</span>formData<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>User<span class="token punctuation">.</span><span class="token function">toggleLoading</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>\n        <span class="token keyword">await</span> <span class="token keyword">of</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span><span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">1500</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toPromise</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>User<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span><span class="token punctuation">{</span> access_token<span class="token operator">:</span> Encryption<span class="token punctuation">.</span><span class="token constant">MD5</span><span class="token punctuation">(</span>formData<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">onGetUserInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token keyword">return</span> <span class="token boolean">true</span>\n    <span class="token punctuation">}</span>\n    <span class="token doc-comment comment">/**\n     * 校验登陆状态\n     * <span class="token keyword">@memberof</span> SystemController\n     */</span>\n    <span class="token keyword">async</span> <span class="token function">onVerify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>User<span class="token punctuation">.</span><span class="token function">toggleLoading</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>\n        <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>User<span class="token punctuation">.</span>HydrateAsync\n        <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">onGetUserInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">async</span> <span class="token function">onGetUserInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>lodash<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>AccessToken<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>User<span class="token punctuation">.</span><span class="token function">toggleLoading</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">await</span> <span class="token keyword">of</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span><span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">1500</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toPromise</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>User<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span><span class="token punctuation">{</span> username<span class="token operator">:</span> <span class="token string">&#39;admin&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>User<span class="token punctuation">.</span><span class="token function">toggleLoading</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token doc-comment comment">/**\n     * 退出登录\n     * <span class="token keyword">@return</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span> \n     * <span class="token keyword">@memberof</span> SystemController\n     */</span>\n    <span class="token keyword">async</span> <span class="token function">onLoginOut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>User<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token keyword">return</span> <span class="token boolean">true</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br></div></div></details>',2),t={},e=(0,a(3744).Z)(t,[["render",function(n,s){return p}]])},3744:(n,s)=>{s.Z=(n,s)=>{for(const[a,p]of s)n[a]=p;return n}},3093:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-1132d192",path:"/clients/controller/system.html",title:"System",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[],filePathRelative:"clients/controller/system.md",git:{updatedTime:1629711116e3,contributors:[{name:"LengYXin",email:"lengyingxin8966@gmail.com",commits:1}]}}}}]);