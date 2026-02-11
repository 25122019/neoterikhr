import { prisma } from "./prisma";

export type Locale = 'en' | 'vi' | 'de';
export type LocalizedString = Record<Locale, string>;

export interface Review {
  id: string;
  title: string | LocalizedString;
  slug: string;
  description: string | LocalizedString;
  content: string | LocalizedString;

  rating: number;
  category: string;
  image: string;

  author?: string;
  createdAt?: string;

  type?: 'project' | 'product';
  affiliateUrl?: string;
  commission?: string;
  cookieTime?: string;
  paymentMethods?: string[];
  pros?: (string | LocalizedString)[];
  cons?: (string | LocalizedString)[];
}

export const reviews: Review[] = [
  {
    id: '1',
    title: 'Wealthy Affiliate Review 2026: Is It Still Worth It?',
    slug: 'wealthy-affiliate-review-2026',
    description: 'A comprehensive look at Wealthy Affiliate platform and its potential for beginners in 2026.',
    content: `
      <h2>Introduction</h2>
      <p>Wealthy Affiliate has been a staple in the affiliate marketing training space for over two decades. But in 2026, does it still hold up?</p>
      <h2>What is Wealthy Affiliate?</h2>
      <p>Wealthy Affiliate is an all-in-one platform for affiliate marketers, offering hosting, training, and research tools.</p>
    `,
    rating: 4.5,
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: 'Bluehost Affiliate Program: High Commission Potential',
    slug: 'bluehost-affiliate-program-review',
    description: 'Deep dive into why Bluehost remains one of the most popular affiliate programs for bloggers.',
    content: `
      <h2>Why Bluehost?</h2>
      <p>Bluehost is one of the world's largest web hosting providers and is officially recommended by WordPress.org.</p>
    `,
    rating: 4.2,
    category: 'Hosting',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    title: 'MacBook Pro M3 for Digital Nomads',
    slug: 'macbook-pro-m3-review-affiliate',
    description: 'Why the M3 MacBook Pro is the ultimate tool for affiliate marketers on the go.',
    content: `
      <h2>Performance Meets Portability</h2>
      <p>The MacBook Pro M3 offers incredible battery life and performance for video editing and multitasking.</p>
    `,
    rating: 4.9,
    category: 'Gear',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '5',
    title: 'Sony ZV-1 II Vlogging Camera',
    slug: 'sony-zv1-ii-review',
    description: 'The best compact camera for affiliate marketers creating video reviews.',
    content: `
      <h2>Compact Video Powerhouse</h2>
      <p>Sony's ZV-1 II makes it easy to create professional-looking reviews with its excellent autofocus and built-in ND filter.</p>
    `,
    rating: 4.7,
    category: 'Gear',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '6',
  slug: 'n8n-affiliate-review',
  type: 'project',
  category: 'AI',
  rating: 4.9,
  image: 'https://controlc.io/wp-content/uploads/2024/12/Group-427319500.webp',
  affiliateUrl: 'https://n8n.partnerlinks.io/l15a40d8l5p2',
  createdAt: '2026-01-23',
  commission: '30% recurring for 12 months',
  cookieTime: '30 days',
  paymentMethods: ['PayPal', 'Stripe', 'Wire Transfer'],
  title: {
    en: 'n8n Review 2026: The Ultimate AI Workflow Automation Tool',
    vi: 'Đánh giá n8n 2026: Công cụ tự động hóa quy trình AI tối thượng',
    de: 'n8n Review 2026: Das ultimative KI-Workflow-Automatisierungstool'
  },
  description: {
    en: 'Unlock advanced AI automation with n8n. Join the affiliate program and earn 30% recurring commission.',
    vi: 'Mở khóa tự động hóa AI nâng cao với n8n. Tham gia chương trình affiliate và nhận 30% hoa hồng định kỳ.',
    de: 'Schalten Sie fortschrittliche KI-Automatisierung mit n8n frei. Werden Sie Affiliate-Partner và nhận 30% hoa hồng định kỳ.'
  },
  content: {
    en: `
      <h2>What is n8n?</h2>
      <p>n8n is an extendable workflow automation tool that lets you connect anything to everything via its open, fair-code model. It is particularly powerful for building AI agents and complex data pipelines.</p>
      <h2>The Affiliate Opportunity</h2>
      <p>The n8n affiliate program offers a generous 30% commission for every n8n cloud referral you bring for the first 12 months. This is perfect for tech reviewers, automation consultants, and content creators.</p>
      <h2>Why Promote n8n?</h2>
      <ul>
        <li>Leader in AI workflow automation.</li>
        <li>High conversion rates for tech-savvy audiences.</li>
        <li>Excellent documentation and community support.</li>
      </ul>
    `,
    vi: `
      <h2>n8n là gì?</h2>
      <p>n8n là một công cụ tự động hóa quy trình công việc có thể mở rộng, cho phép bạn kết nối mọi thứ với nhau thông qua mô hình fair-code mở. Nó đặc biệt mạnh mẽ trong việc xây dựng các đại lý AI (AI agents) và các đường ống dữ liệu phức tạp.</p>
      <h2>Cơ hội Affiliate</h2>
      <p>Chương trình affiliate của n8n cung cấp mức hoa hồng 30% hào phóng cho mỗi lượt giới thiệu đăng ký n8n cloud trong 12 tháng đầu tiên. Đây là lựa chọn hoàn hảo cho các nhà đánh giá công nghệ, tư vấn tự động hóa và người sáng tạo nội dung.</p>
      <h2>Tại sao nên quảng bá n8n?</h2>
      <ul>
        <li>Dẫn đầu trong tự động hóa quy trình làm việc bằng AI.</li>
        <li>Tỷ lệ chuyển đổi cao cho đối tượng am hiểu công nghệ.</li>
        <li>Tài liệu hướng dẫn và hỗ trợ cộng đồng xuất sắc.</li>
      </ul>
    `,
    de: `
      <h2>Was ist n8n?</h2>
      <p>n8n ist ein erweiterbares Tool zur Workflow-Automatisierung, mit dem Sie alles mit jedem verbinden können. Es ist besonders leistungsstark für die Erstellung von KI-Agenten und komplexen Datenpipelines.</p>
      <h2>Die Affiliate-Möglichkeit</h2>
      <p>Das n8n-Affiliate-Programm bietet eine großzügige Provision von 30 % für jede n8n-Cloud-Empfehlung, die Sie in den ersten 12 Monaten einbringen. Dies ist ideal für Technik-Reviewer und Automatisierungsberater.</p>
      <h2>Warum n8n bewerben?</h2>
      <ul>
        <li>Marktführer bei der KI-Workflow-Automatisierung.</li>
        <li>Hohe Konversionsraten bei technikaffinem Publikum.</li>
        <li>Hervorragende Dokumentation und Community-Support.</li>
      </ul>
    `
  },
  pros: [
    { en: '30% recurring commission', vi: 'Hoa hồng định kỳ 30%', de: '30 % wiederkehrende Provision' },
    { en: 'Perfect for AI agents', vi: 'Hoàn hảo cho AI agents', de: 'Perfekt für KI-Agenten' },
    { en: 'Fair-code model', vi: 'Mô hình Fair-code minh bạch', de: 'Fair-Code-Modell' }
  ],
  cons: [
    { en: 'Requires technical knowledge', vi: 'Đòi hỏi kiến thức kỹ thuật', de: 'Erfordert technisches Wissen' },
    { en: 'Cloud vs Self-hosted distinction', vi: 'Phân biệt giữa bản Cloud và Self-hosted', de: 'Unterscheidung zwischen Cloud und Self-Hosted' }
    ],
  },
];

export async function seedReviews() {
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { slug: review.slug },
      update: review,
      create: review,
    });
  }
}
