mport React, { useMemo, useState } from "react"; import { motion } from "framer-motion"; import { Phone, Upload, Camera, Sparkles, CheckCircle2, Building2, Globe2, Hammer, Store, ArrowRight, Mail, MapPin, ShieldCheck, ClipboardList, Package, Search, MessageCircle } from "lucide-react"; import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Input } from "@/components/ui/input"; import { Textarea } from "@/components/ui/textarea"; import { Badge } from "@/components/ui/badge"; import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Logo() { return (

K
K-카페
Cafe Buyout · Removal · Overseas Relocation
); }
function SectionTitle({ eyebrow, title, desc }) { return (

{eyebrow}
{title}
{desc}

); }
function Stat({ value, label }) { return (

{value}
{label}
); }
function Feature({ icon: Icon, title, desc }) { return (

{title}
{desc}

); }
function Hero() { return (

<motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="rounded-[36px] overflow-hidden bg-white shadow-xl border border-slate-200">
K-카페 BUYOUT PLATFORM
010-4835-7422
contact@sjglobal.info
폐업 카페,
그냥 버리지 마세요.
K-카페가 매입하고 해외에서 다시 살립니다.
사진과 구매연도, 상태만 등록하면 AI가 1차 적정가를 계산하고, K-카페 관리자가 실제 매입 가능 금액을 다시 제안합니다. 개별 장비, 매장 전체 집기, 철거 포함 매각, 해외 이전용 매입까지 한 번에 연결합니다.

무료 견적 받기 판매 등록하기
AI 견적 미리보기
예상 적정가 범위
₩6,500,000 ~ ₩9,000,000
대구 수성구 카페 · 13평 · 폐업 정리 · 사진 18장 업로드 · 커피장비 상태 양호 · 철거 포함 요청
브랜드 가치 반영
연식 감가 적용
철거비 차감 고려
해외 재사용 가능성
실제 운영 시 Google Workspace, Firebase, 이미지 업로드, 관리자 승인, 견적 알림, 계약 및 일정 관리와 연결할 수 있습니다.
</motion.div> ); }
function QuoteSimulator() { const [category, setCategory] = useState("전체 매장"); const [condition, setCondition] = useState("양호"); const [year, setYear] = useState("2022"); const [base, setBase] = useState("7000000");

const range = useMemo(() => { const age = Math.max(0, 2026 - Number(year || 2026)); const conditionFactor = condition === "최상" ? 1.05 : condition === "양호" ? 0.92 : condition === "보통" ? 0.75 : 0.55; const categoryFactor = category === "전체 매장" ? 1.15 : category === "커피장비" ? 1 : category === "주방장비" ? 0.9 : 0.8; const ageFactor = Math.max(0.45, 1 - age * 0.1); const value = Math.round(Number(base || 0) * conditionFactor * categoryFactor * ageFactor); return { low: Math.round(value * 0.86), high: Math.round(value * 1.14) }; }, [category, condition, year, base]);

return ( 빠른 AI 견적 계산기 초기 오픈 버전에서는 규칙 기반 계산으로 시작하고, 실제 거래 데이터가 쌓이면 더 정확하게 고도화합니다.

판매 유형 
상태 
구입 연도 <Input className="mt-2 rounded-2xl" value={year} onChange={(e) => setYear(e.target.value)} />
기준 가격 <Input className="mt-2 rounded-2xl" value={base} onChange={(e) => setBase(e.target.value)} />
예상 AI 견적 범위
₩{range.low.toLocaleString()} ~ ₩{range.high.toLocaleString()}
연식, 상태, 판매 유형을 기반으로 계산된 1차 범위입니다. 실제 매입가는 관리자 검토 및 현장 실사 후 확정됩니다.
AI 1차 산정 관리자 재검토 현장 실사 가능
); }
function SellForm() { return ( 판매 등록 개별 장비, 세트 판매, 매장 전체, 철거 포함 요청을 등록할 수 있습니다.

 

개별 판매
세트 판매 매장 전체 철거 포함
