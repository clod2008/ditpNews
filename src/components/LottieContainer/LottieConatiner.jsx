import { useLottie } from "lottie-react";

export const LottieConatiner = ({
  lottieJason, 
  lottieBg='tranparent', 
  viewerHeigth='300px', 
  loop=true,
  autoplay=true
  
  }) => 
  {
    const style = {
      height: viewerHeigth,
      backgroundColor: lottieBg,
    };

    const options = {
      animationData: lottieJason,
      loop: loop,
      autoplay: autoplay,
    };

    const { View } = useLottie(options, style);

    return View
  }
