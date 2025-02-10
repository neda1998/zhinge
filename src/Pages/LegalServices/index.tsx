import Header from "../../components/template/Header";
import Images from "../../components/ui/atoms/Image";
import conditionPic from "../../assets/images/service/legal.svg";
import "../../App.css";

export default function LegalServices() {
  return (
    <div>
      <Header />
      <div className="flex flex-col w-full pt-24 px-12 gap-4 mobile:px-0">
        <div className="w-full flex items-center h-[fit-content] gap-2 mobile:justify-center mobile:mb-8">
          <div className="w-10 h-2 rounded-3xl bg-[#09A380] mobile:hidden"></div>
          <p className="text-[30px] mobile:text-[20px] font-bold">
            قوانین و شرایط
          </p>
          <p className="text-[30px] mobile:text-[20px] font-bold text-[#09A380]">
            ژینگه
          </p>
        </div>
      </div>
      <div className="w-full flex items-start no-scrollbar mobile:flex-col-reverse mobile:gap-12 sm:py-0 py-6">
        <div className="w-[50%] h-[30rem] overflow-scroll no-scrollbar px-12 py-8 mobile:px-3 mobile:py-0 mobile:w-full">
          <div className="text-[16px] leading-relaxed text-start mobile:text-[15px]">
            آگاهی حقوقی ملک مشاوره حقوقی املاک در جلوگیری از مشکلات احتمالی در
            معاملات ملکی بسیار موثر است. مشاوره حقوقی املاک به شما کمک می‌کند تا
            با آگاهی و بینش حقوقی به معامله پرداخته و قرارداد را امضا کنید.
            هشدار های حقوقی این را در نظر بگیرید که کوچکترین سهل‌انگاری در
            معاملات املاک و نادیده انگاشتن مفاد و تبصره‌های قرارداد ممکن است
            خسارات و ضررهای مالی هنگفتی برای شما در پی داشته باشد، از اینرو
            مشورت با وکیل مجرب ملکی در خرید و فروش املاک توصیه می‌گردد. حتی
            پیشنهاد احتیاط‌آمیز این است که قبل از اقدام به خرید و فروش ملک و
            تنظیم قرارداد و تائید آن کلیه جوانب حقوقی را با مشورت وکیل ملکی
            بررسی و از صحت و کامل بودن قرارداد اطمینان حاصل نمائید. نحوه تنظیم
            قرار داد حقوقی مشاوره حقوقی املاک قبل و حین تنظیم قرارداد تضمین
            کننده امنیت و حافظ منافع و اموال شماست. این نکته قابل تامل این است
            که معاملات املاک معمولاً جزو معاملات گران‌قیمت هستند و پول زیادی در
            آن رد و بدل می‌شود، از اینرو با توجه به اهمیت و حساسیت بالای آن و
            احتمال ضرر و زیان مالی استفاده از خدمات مشاوره حقوقی املاک جهت تضمین
            معامله اجتناب‌ناپذیر است.
          </div>
        </div>
        <div className="w-[50%] flex justify-center items-start mobile:w-full">
          <Images
            src={conditionPic}
            alt="condition"
            width={"450px"}
            height={"400px"}
            className={"object-contain mobile:w-[350px] mobile:h-[300px]"}
          />
        </div>
      </div>
    </div>
  );
}
