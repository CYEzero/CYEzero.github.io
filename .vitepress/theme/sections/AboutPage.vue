<template>
  <div class="site-container about-layout">
    <div class="about-profile">
      <img src="/images/avatar.png" alt="个人头像" class="about-avatar shadow-md" />
      <p class="mb-0 mt-4 text-center text-2xl">CYEzero</p>
    </div>

    <div class="about-content">
      <h2 class="m-0 text-3xl font-bold">关于我</h2>
      <p>
        大家好！这里是CYEzero，经过多轮迭代，现在是我最常用的网名，也会用CYE_zero、ZeroCye、紗衣澪等。
      </p>
      <p>头像是我最近非常喜欢的一个角色，来自鸣潮的穗穗，手绘风格。也许后面会换头像，谁知道呢。</p>
      <p>创作，这是我最喜欢做的。无论开发项目，或是动笔写字。将想法表达出来总是最美妙的。</p>
      <p>热爱传统文化，学习各种计算机技术中……</p>
      <p>想成为一个“纯粹”的人。</p>
    </div>
  </div>
</template>

<style scoped>
.about-layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
}

.about-profile {
  justify-self: center;
  width: min(15rem, 100%);
  text-align: center;
}

.about-avatar {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
}

.about-content {
  min-width: 0;
  text-align: left;
  overflow-wrap: anywhere;
}

@media (max-width: 767px) {
  .about-layout {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 2rem;
  }
}
</style>
