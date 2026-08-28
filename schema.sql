-- ==================== Fridge Mate - Database Schema ====================

-- 1) 가족 그룹
create table families (
  id uuid default gen_random_uuid() primary key,
  name text default 'Notre Frigo',
  invite_code text unique,
  created_at timestamptz default now()
);

-- 2) 가족 멤버
create table family_members (
  id uuid default gen_random_uuid() primary key,
  family_id uuid references families(id) not null,
  user_id uuid references auth.users not null,
  role text default 'member',
  joined_at timestamptz default now(),
  unique(family_id, user_id)
);

-- 3) 식품 테이블
create table foods (
  id uuid default gen_random_uuid() primary key,
  family_id uuid references families(id) not null,
  name text not null,
  quantity text default '1',
  category text default 'Autres',
  added_at date default current_date,
  expires_at date not null,
  notes text,
  added_by uuid references auth.users not null,
  created_at timestamptz default now()
);

-- 인덱스
create index foods_family_idx on foods(family_id);
create index foods_expires_idx on foods(expires_at);

-- RLS 활성화
alter table families enable row level security;
alter table family_members enable row level security;
alter table foods enable row level security;

-- policies: 자신이 속한 family의 데이터만 접근 가능

-- families: family 멤버만 조회 가능
create policy "members can view their family"
  on families for select
  using (
    id in (select family_id from family_members where user_id = auth.uid())
  );

-- family_members: 자신의 멤버십만 조회
create policy "users can view own memberships"
  on family_members for select
  using (user_id = auth.uid());

-- foods: 같은 family 멤버만 CRUD
create policy "family can view foods"
  on foods for select
  using (
    family_id in (select family_id from family_members where user_id = auth.uid())
  );

create policy "family can insert foods"
  on foods for insert
  with check (
    family_id in (select family_id from family_members where user_id = auth.uid())
  );

create policy "family can update foods"
  on foods for update
  using (
    family_id in (select family_id from family_members where user_id = auth.uid())
  );

create policy "family can delete foods"
  on foods for delete
  using (
    family_id in (select family_id from family_members where user_id = auth.uid())
  );
