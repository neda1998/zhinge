import Header from "../../components/template/Header";
import Images from "../../components/ui/atoms/Image";
import conditionPic from "../../assets/images/service/legal.svg";
import "../../App.css";
import UseGetAboutQuery from "../../hooks/queries/admin/getAbout/UseGetAboutQuery";

export default function LegalServices() {
  const { data } = UseGetAboutQuery();
  return (
    <div>
      <Header />
      <div className="flex flex-col w-full pt-24 px-12 gap-4 mobile:px-0">
        <div className="w-full flex items-center h-[fit-content] gap-2 mobile:justify-center mobile:mb-8">
          <div className="w-10 h-2 rounded-3xl bg-[#09A380] mobile:hidden"></div>
          <p className="text-[30px] mobile:text-[20px] font-bold">
            درباره
          </p>
          <p className="text-[30px] mobile:text-[20px] font-bold text-[#09A380]">
            ژینگه
          </p>
        </div>
      </div>
      <div className="w-full flex items-start no-scrollbar mobile:flex-col-reverse mobile:gap-12 sm:py-0 py-6">
        <div className="w-[50%] p-12 mobile:px-3 mobile:py-0 mobile:w-full">
          <div className="text-[16px] leading-relaxed text-start mobile:text-[15px]">
            <p className="mb-4">{data?.about || "ژینگه یک پلتفرم آنلاین است که به شما کمک می‌کند تا به راحتی و سریع خانه یا ملک مورد نظر خود را پیدا کنید. با استفاده از ژینگه، می‌توانید به صورت آنلاین جستجو کنید، اطلاعات ملک‌ها را مشاهده کنید و با مالکان یا مشاوران املاک تماس بگیرید."}</p>
            <p className="mb-4">{data?.goals}</p>
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
