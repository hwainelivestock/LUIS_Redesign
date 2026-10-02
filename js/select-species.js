(function () {
  function getCPH(){ var p = new URLSearchParams(location.search); return p.get('cph') || '44/077/0001'; }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function enc(s){ return encodeURIComponent(String(s==null?'':s)); }
  function iconFor(species){
    return species === 'Cattle'   ? 'cattle-icon.svg'
         : species === 'Sheep'    ? 'sheep-icon.svg'
         : species === 'Goat'     ? 'goat-icon.svg'
         : species === 'Camelids' ? 'camelid-icon.svg'
         : 'cattle-icon.svg';
  }
  function iconForFA(species){ return species === 'Cattle' ? 'fa-tractor' : 'fa-tag'; }

  var SPECIES_ICONS = {
    'cattle-icon.svg':
      '<svg viewBox="0 0 48 48" fill="none" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
      '<g clip-path="url(#clip0_185_3583)">' +
      '<path d="M99.9796 45.5704C99.9796 45.5704 100.17 44.468 100.851 43.9638C100.851 43.9638 100.539 34.1185 101.571 28.5215C101.571 28.5215 98.2432 37.5565 99.9796 45.5704ZM8.82326 24.9222C10.5675 24.4066 11.5928 22.5472 11.5928 22.5472C13.1314 20.0681 14.4644 18.6216 14.4644 18.6216C14.9777 16.6594 16.8228 14.2844 16.8228 14.2844C17.8482 12.9407 18.8747 11.3913 18.8747 11.3913C16.4142 9.32624 16.5164 7.46692 16.5164 7.46692C17.7687 8.80172 20.2292 10.4718 20.2292 10.4718C20.8851 9.71741 23.2283 10.0006 23.2283 10.0006C22.2913 8.86776 21.3542 7.16972 21.3542 7.16972C21.5421 5.09322 22.4792 6.41405 22.4792 6.41405C22.7604 7.92413 25.5715 9.90664 25.5715 9.90664C26.6952 10.5671 26.5086 11.3215 26.5086 11.3215C25.5715 12.8315 26.6953 12.9255 26.6953 12.9255C28.1015 12.6435 29.316 12.8315 29.316 12.8315C31.9367 13.304 30.0689 15.3792 30.0689 15.3792C30.9126 15.8517 33.1108 16.9909 33.1108 16.9909C38.921 15.9164 50.1845 17.2296 50.1845 17.2296C60.1452 18.6622 74.6411 18.4158 74.6411 18.4158C82.5624 14.668 87.0825 14.828 87.0825 14.828C94.313 14.9347 95.1106 16.1666 95.1106 16.1666C97.8753 16.0053 98.9918 16.5413 98.9918 16.5413C104.096 18.4158 102.448 28.5342 102.448 28.5342C101.172 34.1566 101.544 43.7936 101.544 43.7936C103.83 44.6508 103.033 50.7013 103.033 50.7013C103.139 51.9853 105 54.2878 105 54.2878C103.724 53.9132 103.086 53.3252 103.086 53.3252C103.246 54.3412 102.714 56.6336 102.714 56.6336C101.884 63.5603 102.714 69.8889 102.714 69.8889C102.714 72.0378 101.646 72.1572 101.646 72.1572C101.528 76.0981 98.3525 76.0981 98.3525 76.0981C95.5332 76.2174 95.3618 75.0236 95.3618 75.0236C95.3618 73.2316 97.4961 71.0827 97.4961 71.0827C98.4446 67.0224 98.2075 62.0071 98.2075 62.0071C97.2588 56.156 95.1247 55.3204 95.1247 55.3204C94.7689 57.7093 92.6346 63.2022 92.6346 63.2022C91.6857 66.4255 90.9744 70.247 90.9744 70.247C90.6188 72.7541 89.9075 72.2766 89.9075 72.2766C89.9075 73.8285 88.6034 74.1867 88.6034 74.1867C85.9941 75.6205 83.7416 74.3061 83.7416 74.3061C83.6231 72.7541 87.2994 68.0969 87.2994 68.0969C89.6704 63.5591 89.4736 56.5028 89.4736 56.5028C89.3387 57.2267 88.3953 56.5485 88.3953 56.5485C87.2288 57.4972 87.2288 55.1464 87.2288 55.1464C87.0938 54.2421 86.2627 54.3602 86.2627 54.3602C85.8528 57.355 85.0318 55.5998 85.0318 55.5998C83.391 57.2521 83.5966 52.7079 83.5966 52.7079C81.8524 51.2614 79.4928 49.0922 79.4928 49.0922C72.8262 52.8108 63.3902 51.1572 63.3902 51.1572C58.6722 50.3317 52.3688 51.5712 52.3688 51.5712C53.041 54.9787 52.0044 58.9044 52.0044 58.9044C51.5945 63.0358 52.2099 69.2336 52.2099 69.2336C53.543 72.5382 51.5945 72.2283 51.5945 72.2283C52.1078 73.4678 51.4923 74.3975 51.4923 74.3975C51.0812 77.3935 46.8764 76.9807 46.8764 76.9807C44.1069 75.637 47.3897 71.4028 47.3897 71.4028C48.2095 67.3742 47.9018 61.6934 47.9018 61.6934C47.082 60.351 45.5434 56.3224 45.5434 56.3224C43.5936 58.0789 44.0048 70.2661 44.0048 70.2661C43.5936 73.1592 42.6705 72.7452 42.6705 72.7452C41.9529 75.8441 39.4911 75.6371 39.4911 75.6371C37.2348 75.8441 36.8249 75.1214 36.8249 75.1214C36.8249 73.6749 39.3889 70.576 39.3889 70.576C40.4142 68.0982 40.3121 64.9993 40.3121 64.9993C40.5176 56.6323 38.5679 52.5009 38.5679 52.5009C33.8499 50.9515 32.1069 46.2003 32.1069 46.2003C28.8241 43.4113 28.7219 37.2136 28.7219 37.2136C25.5425 31.8426 23.4906 31.6369 23.4906 31.6369C20.9267 32.3595 18.8747 32.1525 18.8747 32.1525C17.234 31.5327 15.6954 31.4349 15.6954 31.4349C13.849 31.2343 12.3104 31.6369 12.3104 31.6369C10.8752 31.7397 9.952 30.2932 9.952 30.2932C6.36146 28.0211 8.82326 24.9222 8.82326 24.9222Z" fill="#0d3349"/>' +
      '</g>' +
      '<rect x="1" y="1" width="46" height="46" rx="7" stroke="#0d3349" stroke-width="2"/>' +
      '<defs><clipPath id="clip0_185_3583"><rect width="48" height="48" rx="8" fill="white"/></clipPath></defs>' +
      '</svg>',
    'sheep-icon.svg':
      '<svg viewBox="0 0 48 48" fill="none" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
      '<g clip-path="url(#clip0_185_3584)">' +
      '<path d="M92.6654 49.9649V55.8344C92.6654 56.5458 92.4868 57.2573 92.3083 57.9687C91.7727 59.0359 91.237 59.9252 90.7014 60.8145C89.8087 61.8817 90.5229 62.5931 90.5229 63.3046C90.8799 64.3718 90.8799 65.2611 90.8799 66.1504V74.3321C90.8799 74.6878 90.5229 74.8656 89.9872 74.8656L90.1658 77C89.4516 77 88.7374 76.8221 88.0233 76.8221C87.4876 76.6443 86.7735 76.2885 86.2378 76.1107C86.4164 75.5771 86.952 75.0435 87.4876 74.6878C87.8447 74.5099 87.6662 74.1542 87.6662 74.1542C87.6662 71.6641 87.3091 69.174 86.952 66.684C86.952 65.9725 86.5949 65.4389 86.2378 65.0832C85.5237 64.5496 84.0953 63.6603 84.0953 63.6603C84.0953 63.6603 83.7382 63.3046 83.3811 63.4824C83.2026 63.6603 83.2026 63.8382 83.2026 64.1939C83.024 64.3718 82.1313 69.8855 82.1313 69.8855C82.1313 69.8855 81.2386 73.7985 81.0601 74.1542C80.8815 74.5099 80.8815 74.3321 80.5244 74.3321C80.1674 74.5099 79.8103 74.3321 79.6317 74.6878C79.4532 75.0435 79.4532 75.3992 79.4532 75.9328L79.2746 77C78.9176 76.6443 78.0248 77 77.6678 76.8221C77.3107 76.6443 76.9536 76.4664 76.5965 76.4664C76.5965 76.1107 76.775 75.5771 76.775 75.2214C76.9536 74.8657 77.3107 74.8657 77.4892 74.6878V74.3321C77.6678 72.7313 78.0248 70.9527 78.5605 69.174C78.5605 67.3954 78.5605 65.6168 78.739 63.6603C78.5605 63.6603 78.9176 60.4588 76.5965 59.2137C74.6325 58.3244 73.9184 59.2137 72.49 59.3916C68.205 60.2809 63.92 60.8145 59.4564 60.8145C52.4932 60.8145 51.779 59.9252 50.5292 60.2809C49.6365 60.4588 48.9224 61.7038 48.0296 62.5931C47.494 63.3046 47.1369 64.016 47.1369 64.9053C47.3155 66.3282 47.494 67.5733 47.8511 68.9962C48.2082 70.5969 48.3867 72.3756 48.2082 74.1542C47.8511 74.3321 47.494 74.5099 47.1369 74.5099C47.1369 75.2214 47.1369 75.9328 46.9584 76.6443C46.2442 76.8221 45.53 77 44.8159 77C44.2802 77 43.5661 76.2886 43.0304 75.9328C43.209 75.0435 43.7446 74.1542 44.2802 73.2649C44.4588 73.087 44.4588 72.7313 44.4588 72.3756C44.4588 71.6641 44.4588 70.7748 44.2802 70.0634C44.1017 68.8183 43.7446 67.5733 43.5661 66.3282C43.209 65.2611 42.8519 64.3718 42.3163 63.3046C41.9592 62.9489 41.4235 62.5931 40.8879 62.4153C40.8879 65.4389 40.8879 72.5534 40.8879 73.4427C40.8879 73.9763 40.3523 74.3321 39.9952 74.5099C39.4596 74.8656 39.1025 75.5771 38.924 76.2885H35.1745C35.3531 75.2214 35.7102 73.6206 35.7102 73.6206C36.2458 73.087 36.6029 72.3756 36.96 71.842C37.3171 71.4863 37.3171 71.3084 37.3171 70.9527C37.1385 70.9527 36.7814 64.3718 36.7814 64.016C36.7814 62.9489 36.4244 61.8817 35.8887 60.9924C35.1746 60.2809 34.4604 59.7473 33.5677 59.5695C32.3179 58.858 31.2466 57.9687 30.1754 56.9015C28.9256 55.4786 28.0328 53.8779 27.3187 52.2771C26.2474 49.9649 25.3547 47.6527 24.6405 45.1626C24.1049 43.2061 23.5693 41.0718 23.2122 39.1153C23.0336 38.0481 22.8551 35.0244 22.8551 34.4909C22.8551 33.7794 22.6765 33.068 22.1409 32.7122C21.6053 32.5344 21.2482 32.3565 20.7126 32.3565C20.1769 32.5344 19.8199 32.5344 19.2842 32.7122C18.5701 32.8901 14.9992 33.9573 14.6421 34.1351H13.7494C13.5709 34.1351 13.3923 33.9573 13.2138 33.9573C12.8567 33.6015 12.4996 33.2458 11.964 32.8901C11.6069 32.7122 10.5356 32.7122 10.3571 32.1786C10.1785 32.0008 10 31.8229 10 31.2893C10 30.4 10.3571 29.6886 10.5356 28.9771C11.4283 27.5542 12.4996 26.1313 13.5709 24.8863C14.8207 23.2855 16.0705 21.8626 17.4988 20.6176C18.5701 19.7283 19.6413 18.8389 20.8911 18.1275C21.7838 17.7718 22.6766 17.416 23.7478 17.0603C24.2834 16.8825 24.8191 16.8825 25.3547 17.0603C25.5332 16.3489 25.7118 15.8153 26.0689 15.2817C26.6045 14.5702 27.1401 14.0367 27.8543 13.5031C28.3899 13.1473 29.2826 12.7916 29.6397 13.1473C29.9968 13.5031 29.9968 14.2145 29.8183 14.926C29.4612 15.4596 29.2826 15.9931 29.2826 16.5267C29.2826 16.5267 33.5677 19.0168 34.6389 19.7283C38.0312 21.8626 40.3523 25.242 42.3163 25.5977C43.7446 25.7756 45.173 25.7756 46.6013 25.7756C55.1714 25.4199 73.7398 24.5305 76.2394 24.5305C78.3819 24.3527 80.703 24.5306 82.8455 24.8863C84.2739 25.4199 89.0945 27.0206 91.5941 30.4C93.5581 33.7794 95.165 37.3367 94.9864 40.0046C94.8079 41.4275 94.4508 43.0283 93.7366 44.2733C93.201 45.3405 92.8439 46.4076 92.8439 47.4748L92.6654 49.9649Z" fill="#0d3349"/>' +
      '</g>' +
      '<rect x="1" y="1" width="46" height="46" rx="7" stroke="#0d3349" stroke-width="2"/>' +
      '<defs><clipPath id="clip0_185_3584"><rect width="48" height="48" rx="8" fill="white"/></clipPath></defs>' +
      '</svg>',
    'goat-icon.svg':
      '<svg viewBox="0 0 48 48" fill="none" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
      '<g clip-path="url(#clip0_185_3596)">' +
      '<path d="M49.5157 52.4949C49.5157 52.6597 49.5157 52.6597 49.3509 53.154C49.3509 53.3187 49.1861 53.6482 49.1861 53.813C49.1861 53.9777 49.1861 54.1425 49.1861 54.3073C49.5157 55.2958 49.5157 57.7671 49.5157 60.2385C49.5157 62.8746 49.5157 65.5107 49.8452 67.9821C49.8452 68.4763 50.0099 68.8059 50.1747 69.3001L50.5042 70.2887C50.669 70.6182 50.669 70.9477 50.669 71.2772C50.669 71.442 50.669 71.6067 50.5042 71.7715C50.5042 71.7715 50.3394 71.7715 50.1747 71.7715C50.0099 71.6067 49.8452 71.442 49.6804 71.6067C49.6804 71.7715 49.6804 72.101 49.6804 72.2657C49.6804 72.5953 49.5157 72.76 49.3509 73.0895C49.1861 73.419 48.8566 73.5838 48.6919 73.7486C48.0329 74.0781 47.3738 74.2428 46.7148 74.2428C46.0558 74.4076 45.5615 74.2428 45.0672 73.9133C44.9025 73.7486 44.7377 73.419 44.7377 73.2543C44.7377 73.0895 44.7377 72.76 44.9025 72.5953C45.0672 72.4305 45.0672 72.2657 45.232 72.2657C46.2205 71.442 47.2091 70.4534 47.0443 69.3001C46.8796 67.323 46.7148 65.1812 46.0558 63.3689C45.5615 61.5565 45.232 59.7442 45.0672 58.5909C44.9025 57.2729 44.573 56.2843 44.2434 56.2843C44.2434 57.4376 44.0787 58.2614 44.0787 58.7557C43.9139 62.5451 43.9139 63.2041 43.7492 65.346C43.7492 66.1697 43.5844 66.8288 43.5844 67.6526C43.4197 68.6411 43.4197 69.6296 43.5844 70.6182C43.5844 70.9477 43.7492 71.2772 43.7492 71.6067C43.9139 71.9362 43.9139 72.4305 43.9139 72.9248C43.9139 73.2543 43.7492 73.5838 43.4197 73.7486C43.0901 73.5838 42.9254 73.5838 42.7606 73.7486C42.7606 74.5723 42.1016 75.3961 41.4426 75.8904C40.9483 76.2199 40.454 76.3847 39.9598 76.3847C39.6303 76.3847 39.3007 76.3847 38.8065 76.3847C38.3122 76.3847 37.8179 76.0551 37.6532 75.7256C37.4884 75.3961 37.4884 75.2314 37.4884 74.9018C37.4884 74.7371 37.6532 74.4076 37.8179 74.2428C37.9827 74.0781 38.1474 73.9133 38.3122 73.7486C39.795 72.4305 40.7836 71.2772 40.6188 70.9477C40.6188 69.4649 40.6188 67.9821 40.454 66.4993C39.9598 61.3918 39.4655 56.4491 39.136 53.813C38.8065 51.8359 38.477 50.1883 38.3122 49.3646C38.3122 49.1998 38.1474 49.035 38.1474 48.8703L37.9827 48.7055C37.3237 48.2113 36.6646 47.717 36.1704 46.8932C36.0056 46.5637 35.6761 46.2342 35.5113 45.9047C35.1818 45.2456 34.8523 44.4218 34.6876 43.7628C34.5228 43.1038 34.1933 42.4448 34.1933 41.7857C34.0285 41.2915 34.0285 40.962 34.0285 40.7972C34.0285 40.1382 33.8638 39.6439 33.699 38.9849C33.5343 38.4906 33.2047 38.1611 33.04 37.8316C32.8752 37.6668 32.5457 37.1725 32.0514 36.5135C31.2277 35.525 31.0629 35.525 30.7334 34.866C30.4039 34.5364 30.4039 34.3717 30.0744 33.7127C30.0744 33.7127 29.7449 33.0536 29.4153 32.7241C28.7563 31.7356 27.7678 30.9118 26.7792 30.2528C26.285 29.9233 25.9554 29.7585 25.4612 29.7585C24.9669 29.5937 24.3079 29.5937 23.8136 29.7585C23.4841 29.7585 23.1546 29.9233 22.6603 29.9233C22.3308 29.9233 22.0013 30.088 21.6718 30.2528C21.507 30.2528 21.3423 30.4175 21.1775 30.4175C20.0242 31.0766 18.7061 31.4061 17.3881 31.5708C16.5643 31.5708 16.07 31.2413 16.07 30.5823C15.2463 30.747 14.5872 30.5823 14.4225 30.2528C14.4225 30.088 14.2577 29.9233 14.2577 29.7585C14.2577 29.5937 14.2577 29.5937 14.2577 29.429C14.093 29.2642 13.7634 29.429 13.4339 29.2642C13.1044 28.9347 13.2692 28.4404 13.2692 28.2757C13.2692 28.1109 13.4339 27.9462 13.4339 27.7814C13.7634 27.1224 13.9282 26.9576 13.9282 26.9576C14.752 25.8043 15.9053 23.992 15.9053 23.992C16.2348 23.6625 16.3996 23.1682 16.5643 22.8387C16.7291 22.674 16.7291 22.3444 16.8938 22.0149C17.3881 20.8616 17.3881 20.8616 17.7176 20.3674C17.8824 20.0378 18.0471 19.7083 18.2119 19.3788C18.5414 19.0493 18.7061 18.8846 18.8709 18.3903C19.0357 18.2255 19.2004 17.896 19.2004 17.5665C19.5299 17.0722 19.8594 16.4132 20.3537 15.9189C22.166 13.6123 21.8365 13.7771 22.3308 13.2828C22.9898 12.6238 23.6488 11.9648 24.4726 11.4705C25.2964 10.9762 26.1202 10.6467 26.944 10.3172C27.603 10.1524 28.262 9.98769 29.0858 9.98769C30.0744 9.82293 31.0629 9.98769 32.0514 10.482C32.5457 10.8115 33.04 11.141 33.04 11.4705C32.8752 11.8 31.7219 10.9762 30.0744 11.3057C29.5801 11.4705 29.0858 11.4705 28.5916 11.6353C28.262 11.6353 28.0973 11.8 27.7678 11.9648C27.4383 12.1295 27.1087 12.2943 26.7792 12.6238C26.4497 12.7886 26.1202 13.1181 25.7907 13.4476C25.6259 13.6123 25.2964 13.9418 25.1317 14.1066C24.8021 14.4361 24.4726 14.7656 24.3079 15.2599C24.1431 15.5894 23.9784 15.9189 24.3079 16.2484C24.6374 16.578 25.4612 16.0837 26.285 16.4132C26.6145 16.4132 26.7792 16.578 26.944 16.7427C27.1087 16.9075 27.1087 17.0722 27.2735 17.0722C27.4383 17.0722 27.4383 17.0722 27.603 17.0722C28.262 16.0837 29.0858 15.2599 30.0744 14.6009C29.7449 14.4361 30.2391 14.4361 30.5686 14.6009C30.8981 14.7656 31.0629 14.9304 31.0629 15.2599C31.0629 15.4247 31.2277 15.5894 31.2277 15.7542C31.3924 17.237 30.7334 18.7198 29.4153 19.5436C29.9096 20.0378 30.4039 20.5321 30.7334 21.0264C32.2162 23.0035 33.699 24.9806 35.5113 26.6281C36.0056 27.1224 36.4999 27.4519 37.1589 27.6167C37.4884 27.6167 37.9827 27.7814 38.3122 27.7814C38.8065 27.7814 39.3007 27.9462 39.795 27.9462C42.2664 28.1109 42.9254 27.7814 44.573 28.1109L45.7263 28.2757C46.0558 28.2757 47.2091 28.6052 48.1976 28.77C49.5157 29.0995 49.5157 29.0995 51.1632 29.5937C52.8108 30.088 53.9641 30.2528 54.4584 30.2528C55.6117 30.4175 56.6002 30.5823 57.7535 30.747C59.2363 30.9118 60.0601 31.0766 60.8839 31.0766C62.3667 31.0766 64.0143 31.0766 65.4971 30.747C66.6504 30.5823 67.6389 30.4175 67.9684 30.4175C68.957 30.2528 69.1217 30.2528 69.7807 30.088C70.934 29.9233 72.0873 29.7585 73.4054 29.7585C74.5587 29.7585 75.8767 29.7585 77.03 29.9233C78.0186 29.9233 79.0071 30.088 79.9957 30.2528C80.4899 30.4175 80.9842 30.5823 81.4785 30.747C81.6432 30.9118 82.1375 31.0765 82.467 31.4061C82.9613 31.7356 83.4556 32.2298 83.9498 32.7241C84.1146 32.8889 84.2793 33.2184 84.4441 33.5479C84.6089 33.8774 84.7736 34.3717 84.9384 34.866C85.5974 36.843 86.4212 38.6554 87.4097 40.4677C88.0687 41.7857 89.8811 43.2686 92.8467 45.4104C93.0115 45.4104 93.1762 45.5751 93.1762 45.7399C93.1762 45.9047 93.1762 46.0694 93.0115 46.0694C92.8467 46.2342 92.5172 46.2342 92.3524 46.2342C91.5286 46.2342 91.1991 46.0694 91.0344 46.2342L90.7049 46.5637C90.5401 46.7284 90.5401 46.8932 90.5401 46.8932C90.5401 46.8932 90.3753 46.8932 90.0458 46.8932C89.7163 46.8932 89.5516 46.7284 89.222 46.7284C89.0573 46.5637 88.8925 46.5637 88.7278 46.3989C88.563 46.3989 88.563 46.2342 88.3983 46.3989C88.2335 46.3989 88.2335 46.5637 88.2335 46.5637C88.0687 46.5637 87.904 46.7284 87.7392 46.7284C87.5745 46.7284 87.245 46.5637 87.0802 46.5637C86.9155 46.3989 86.9155 46.3989 86.7507 46.3989C86.5859 46.3989 86.5859 46.3989 86.2564 46.5637C86.0917 46.5637 85.7622 46.5637 85.5974 46.5637C85.4326 46.3989 85.2679 46.3989 85.1031 46.2342C84.9384 46.0694 84.7736 45.9047 84.7736 45.9047C84.7736 47.3875 84.4441 48.8703 83.7851 50.3531C83.6203 51.0121 83.2908 51.5064 83.126 52.0007C82.9613 52.3302 82.9613 52.4949 82.6318 53.154C82.467 53.4835 82.3023 53.9777 82.1375 54.3073C81.9727 54.8015 81.808 55.2958 81.808 55.7901C81.808 56.2843 81.808 56.6138 81.9727 57.1081C82.1375 57.7671 82.3023 58.2614 82.6318 58.9204C82.9613 59.5795 83.126 59.7442 83.6203 60.7328C83.9498 61.227 84.1146 61.5565 84.2793 62.0508C84.4441 62.5451 84.4441 63.0394 84.2793 63.6984C84.2793 64.5222 84.2793 65.346 84.1146 66.1697C84.1146 66.8288 83.9498 67.323 83.7851 67.6526C83.6203 68.4763 83.6203 68.4763 83.4556 68.9706C83.2908 69.6296 83.2908 70.2887 83.2908 70.7829C83.2908 71.442 83.2908 71.7715 83.2908 72.76C83.2908 73.0895 83.2908 73.419 83.126 73.5838C82.9613 73.7486 82.6318 74.0781 82.467 74.0781C82.1375 74.0781 81.9727 74.0781 81.808 74.2428C81.6432 74.2428 81.6432 74.4076 81.4785 74.5723C81.149 74.9019 81.149 75.5609 80.8195 76.0551C80.4899 76.5494 79.9957 76.8789 79.5014 76.8789C78.6776 77.2084 77.8538 77.2084 77.03 76.8789C76.7005 76.8789 76.371 76.5494 76.0415 76.2199C75.8767 75.8904 75.8767 75.5609 76.0415 75.2314C76.0415 75.0666 76.2063 74.9019 76.2063 74.5723C76.371 74.2428 76.7005 73.9133 77.03 73.5838C77.6891 73.0895 78.1833 72.4305 78.6776 71.6067C79.0071 71.1124 79.3366 70.4534 79.6662 69.7944C79.8309 69.3001 80.1604 68.8058 80.3252 68.3116C80.4899 67.8173 80.4899 67.1583 80.6547 66.664C80.6547 66.005 80.6547 65.346 80.6547 64.6869C80.6547 63.8632 80.4899 63.2041 80.1604 62.5451C79.9957 61.8861 79.5014 61.227 79.3366 61.227C79.1719 61.227 79.3366 61.7213 79.3366 62.7099C79.3366 63.2041 79.3366 63.2041 79.1719 64.0279C79.0071 64.8517 79.0071 65.346 79.0071 65.5107C78.8424 66.4993 79.0071 66.4993 78.8424 66.9935C78.6776 67.4878 78.6776 68.1468 78.5129 68.4763C78.3481 68.8059 78.3481 69.1354 78.3481 69.4649C78.1833 70.1239 78.0186 70.7829 77.5243 71.2772C77.3596 71.6067 77.03 71.7715 76.7005 71.9362C76.5358 71.9362 76.371 72.101 76.371 72.101C76.2063 72.101 76.2063 72.101 76.0415 72.101C75.8767 72.101 76.0415 72.4305 76.0415 72.5953C76.0415 73.0895 75.8767 73.5838 75.5472 74.0781C75.2177 74.4076 74.8882 74.7371 74.3939 74.9018C73.4054 75.2314 72.4169 75.2314 71.4283 74.7371C71.0988 74.5723 70.7693 74.4076 70.7693 73.9133C70.7693 73.5838 70.7693 73.2543 70.934 73.0895C71.0988 72.9248 71.2636 72.76 71.4283 72.5953C71.5931 72.4305 71.7578 72.2657 71.9226 72.101C73.4054 70.6182 74.7234 68.9706 75.2177 67.1583C75.8767 64.8517 76.0415 62.5451 75.712 60.0737C75.2177 60.0737 74.8882 60.0737 74.5587 59.7442C74.3939 59.5795 74.3939 59.5795 74.2292 59.4147C74.2292 59.25 74.2292 59.0852 74.0644 59.0852C73.8997 59.0852 73.8997 59.0852 73.7349 59.0852C73.5702 59.0852 73.7349 59.25 73.5702 59.25C73.4054 59.4147 73.4054 59.4147 73.2406 59.4147C73.0759 59.4147 73.0759 59.4147 72.9111 59.4147C72.7464 59.4147 72.7464 59.25 72.7464 59.25C72.5816 59.0852 72.5816 58.9204 72.4169 58.7557C72.2521 58.5909 72.2521 58.2614 72.2521 58.0967C72.0873 57.6024 72.0873 57.6024 72.0873 57.1081C72.0873 56.9434 71.9226 56.7786 71.9226 56.6138C71.7578 56.4491 71.5931 56.2843 71.0988 56.1196C70.7693 55.9548 70.6045 55.7901 70.275 55.6253C69.9455 55.4605 69.616 55.131 69.2865 54.8015C69.1217 54.6368 68.957 54.3073 68.957 53.9777C68.957 53.813 68.957 53.6482 68.957 53.4835C68.957 53.3187 68.7922 53.3187 68.7922 53.3187C68.4627 53.154 67.8037 53.3187 67.3094 53.4835C66.6504 53.6482 66.1561 53.813 65.4971 53.9777C64.838 54.1425 64.179 54.3073 63.52 54.3073C62.861 54.3073 62.0372 54.3073 61.3782 54.3073C60.8839 54.3073 60.3896 54.1425 59.8953 53.9777C59.5658 53.9777 58.9068 53.813 57.9183 53.4835C56.765 53.154 55.7764 52.6597 54.9526 52.4949C54.4584 52.3302 53.9641 52.1654 53.1403 51.8359C52.8108 51.6711 52.3165 51.6711 51.8223 51.5064C50.9985 51.3416 50.1747 51.1769 50.0099 51.5064C49.5157 52.0007 49.5157 52.0007 49.5157 52.4949Z" fill="#0d3349"/>' +
      '</g>' +
      '<rect x="1" y="1" width="46" height="46" rx="7" stroke="#0d3349" stroke-width="2"/>' +
      '<defs><clipPath id="clip0_185_3596"><rect width="48" height="48" rx="8" fill="white"/></clipPath></defs>' +
      '</svg>',
    'camelid-icon.svg':
      '<svg viewBox="0 0 48 48" fill="none" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
      '<g clip-path="url(#clip0_camelid)">' +
      '<path d="M48 48 C50 41, 49.5 34, 47 27 C45 21, 41 16, 37 13 L38 8 L33 12 L31 7 L30 13 C25 14, 21 17, 19 21 C17.5 23.5, 17.5 26, 19.5 27 C21.5 28, 24 27, 25.5 25 C27 27.5, 29 30.5, 30.5 33 C32 36, 33.5 40, 35 43 C36.5 45.5, 39 47.5, 42 48 C44 48.3, 46 48.3, 48 48 Z" fill="#0d3349"/>' +
      '</g>' +
      '<rect x="1" y="1" width="46" height="46" rx="7" stroke="#0d3349" stroke-width="2"/>' +
      '<defs><clipPath id="clip0_camelid"><rect width="48" height="48" rx="8" fill="white"/></clipPath></defs>' +
      '</svg>'
  };

  var cph = getCPH();
  var k = (window.LUIS_DATA && window.LUIS_DATA.keepers || {})[cph];
  var SC = (window.LUIS_DATA && window.LUIS_DATA.speciesCards) || {};
  var OT = (window.LUIS_DATA && window.LUIS_DATA.orderTypes)  || {};

  var ctxRoot  = document.getElementById('context-card-root');
  var listRoot = document.getElementById('species-list');
  var panel    = document.getElementById('species-panel');

  if (!k){ if (panel) panel.innerHTML = '<p style="font-size:13px;color:#aaa;">Keeper not found for CPH ' + esc(cph) + '.</p>'; return; }

  // --- Context card (rebuilds the existing .context-card markup from data) ---
  var addr = k.address.filter(Boolean).join(', ');
  ctxRoot.outerHTML =
    '<div class="context-card" style="margin:16px 16px 16px 20px;">' +
      '<div class="context-card__top">' +
        '<div class="context-card__identity">' +
          '<div class="context-card__eyebrow">Ordering for</div>' +
          '<div class="context-card__name-row">' +
            '<span class="context-card__name">' + esc(k.keeperName || k.name) + '</span>' +
            '<span class="context-card__cph-pill">CPH ' + esc(k.cph) + '</span>' +
          '</div>' +
          '<div class="context-card__details">' + esc(k.name) + ', ' + esc(addr) + ' &nbsp;&middot;&nbsp; ' + esc(k.telephone) + ' &nbsp;&middot;&nbsp; ' + esc(k.mobile) + '</div>' +
        '</div>' +
        '<a href="#" class="context-card__change-keeper"><i class="fas fa-exchange-alt"></i> Change keeper</a>' +
      '</div>' +
      '<div class="context-card__actions">' +
        '<a href="recent-orders-etm.html?cph=' + enc(cph) + '" class="context-card__action-link">Recent orders</a>' +
        '<a href="recent-cancellations-etm.html?cph=' + enc(cph) + '" class="context-card__action-link">Recent cancellations</a>' +
        '<a href="recent-recoveries-etm.html?cph=' + enc(cph) + '" class="context-card__action-link">Recent recoveries</a>' +
      '</div>' +
    '</div>';

  // --- Derive species -> herds map (preserve first-seen order) ---
  var order = [];
  var bySpecies = {};
  k.herds.forEach(function (h) {
    (h.species || []).forEach(function (sp) {
      if (!bySpecies[sp]) { bySpecies[sp] = []; order.push(sp); }
      bySpecies[sp].push(h);
    });
  });

  var unmatchedReqs  = (window.LUIS_DATA && window.LUIS_DATA.getUnmatchedForCph)
    ? window.LUIS_DATA.getUnmatchedForCph(cph)
    : [];
  var unmatchedCount = unmatchedReqs.length;

  // --- Left species list: Attention group first, then Species group ---
  // Hide the hardcoded "Species" eyebrow — we rebuild the full label structure below
  var speciesEyebrow = listRoot.previousElementSibling;
  if (speciesEyebrow) speciesEyebrow.style.display = 'none';

  var umIconBg = unmatchedCount > 0 ? '#dde6ec' : '#eef1f2';
  var umPill   = unmatchedCount > 0
    ? '<span style="display:inline-flex;align-items:center;justify-content:center;'
    + 'min-width:16px;height:16px;padding:0 5px;border-radius:8px;'
    + 'background:#0d3349;color:#fff;font-size:10px;font-weight:700;'
    + 'line-height:1;margin-left:5px;">' + unmatchedCount + '</span>'
    : '';
  var listHtml =
    '<div style="font-size:10px;text-transform:uppercase;color:#9aa4aa;letter-spacing:0.07em;padding:6px 16px 4px;">Attention</div>'
    + '<div class="species-item" data-species="__unmatched" style="background:#f7f9fa;">'
    + '<div style="width:24px;height:24px;background:' + umIconBg + ';border-radius:5px;display:flex;align-items:center;justify-content:center;color:#0d3349;font-size:0.75rem;flex-shrink:0;"><i class="fas fa-exclamation-triangle"></i></div>'
    + '<div><div style="font-size:12px;font-weight:500;color:#0d3349;display:flex;align-items:center;">Unmatched' + umPill + '</div></div>'
    + '</div>'
    + '<div style="height:1px;background:#e7eaec;margin:4px 12px;"></div>'
    + '<div style="font-size:10px;text-transform:uppercase;color:#9aa4aa;letter-spacing:0.07em;padding:6px 16px 4px;">Species</div>';
  listHtml += order.map(function (sp) {
    var herds = bySpecies[sp];
    var sub = herds.length === 1 ? (herds[0].groupType + ' ' + herds[0].herd) : (herds.length + ' herds');
    return '<div class="species-item" data-species="' + esc(sp) + '">' +
        '<div style="width:24px;height:24px;background:#eef1f4;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span class="svg-icon-slot" data-icon="' + iconFor(sp) + '" style="display:block;width:22px;height:22px;line-height:0;"></span></div>' +
        '<div><div style="font-size:12px;font-weight:500;color:#0d3349;">' + esc(sp) + '</div>' +
        '<div style="font-size:11px;color:#888;">' + esc(sub) + '</div></div>' +
      '</div>';
  }).join('');
  listRoot.innerHTML = listHtml;

  listRoot.querySelectorAll('.svg-icon-slot').forEach(function(slot) {
    var filename = slot.getAttribute('data-icon');
    if (filename && SPECIES_ICONS[filename]) { slot.innerHTML = SPECIES_ICONS[filename]; }
  });

  var UM_ROW_LABEL = { primary: 'primary', secondary: 'secondary', eid: 'EID', nonEid: 'non-EID' };

  // --- Panel renderer ---
  function renderPanel(sp) {
    if (sp === '__unmatched') {
      if (unmatchedCount === 0) {
        panel.innerHTML = '<p style="font-size:13px;color:#aaa;font-style:italic;">Nothing unmatched right now.</p>';
      } else {
        var umCards = unmatchedReqs.map(function (req) {
          var rowLabel = UM_ROW_LABEL[req.row] || req.row;
          var url = 'order-form.html?cph=' + enc(cph)
            + '&herd='    + enc(String(req.herd))
            + '&species=' + enc(req.species)
            + '&type='    + enc(req.orderType.toLowerCase())
            + '&variant=new'
            + '&row='     + enc(req.row)
            + '&qty='     + enc(String(req.qty));
          return '<a href="' + url + '" style="display:flex;align-items:center;'
            + 'justify-content:space-between;background:#fff;border-left:3px solid #c8d400;'
            + 'border-radius:0 6px 6px 0;padding:10px 14px;margin-bottom:8px;'
            + 'text-decoration:none;gap:12px;">'
            + '<div style="width:28px;height:28px;background:#dde6ec;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#0d3349;font-size:0.75rem;"><i class="fas fa-exclamation-triangle"></i></div>'
            + '<div style="flex:1;">'
            + '<div style="font-size:13px;font-weight:500;color:#0d3349;">'
            +   'Herd ' + esc(String(req.herd)) + ' · ' + esc(req.species)
            + '</div>'
            + '<div style="font-size:12px;color:#6b7a83;margin-top:2px;">'
            +   esc(req.orderType) + ' order · ' + esc(rowLabel) + ' tag still needed'
            + '</div>'
            + '</div>'
            + '<i class="fas fa-arrow-right" style="color:#8a9600;font-size:0.75rem;flex-shrink:0;"></i>'
            + '</a>';
        }).join('');
        panel.innerHTML = '<div style="font-size:16px;font-weight:500;color:#0d3349;margin-bottom:12px;">Unmatched</div>'
          + umCards;
      }
      return;
    }
    var herds = bySpecies[sp] || [];
    var groups = SC[sp] || [];
    var html = '<div class="d-flex align-items-center mb-3" style="gap:8px;flex-wrap:wrap;">';
    html += '<span style="font-size:16px;font-weight:500;color:#0d3349;">' + esc(sp) + '</span>';
    herds.forEach(function (h) {
      html += '<span style="display:inline-flex;align-items:center;gap:5px;background:#dde6ec;border:0.5px solid #b9c7d2;color:#0d3349;border-radius:4px;padding:3px 9px;font-size:11px;">'
            + '<i class="fas ' + iconForFA(sp) + '"></i> ' + esc(h.groupType) + ' ' + esc(h.herd) + '</span>';
    });
    html += '</div>';
    groups.forEach(function (group) {
      html += '<div style="font-size:10px;text-transform:uppercase;color:#888;border-bottom:0.5px solid #e5e7eb;margin:14px 0 6px;padding-bottom:3px;letter-spacing:0.06em;">' + esc(group.label) + '</div>';
      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
      group.cards.forEach(function (card) {
        var inner = '<div><div class="luis-card__title">' + esc(card.title) + '</div>'
                  + '<div class="luis-card__sub">' + esc(card.sub) + '</div></div>'
                  + '<i class="fas fa-arrow-right luis-card__arrow"></i>';
        var isTagGrid = card.type && OT[card.type] && OT[card.type].template === 'tag-grid';
        var isReplica = card.type === 'replica';
        var dest = null;
        var destType = null;
        var destVariant = null;
        if (isTagGrid) {
          dest = 'order-form.html';
          destType = card.type;
          destVariant = card.variant;
        } else if (isReplica) {
          dest = 'replica-order.html';
          destType = 'replica';
          destVariant = 'replacement';
        }
        if (!dest) {
          html += '<div class="luis-card">' + inner + '</div>';
        } else if (herds.length === 1) {
          var url = dest + '?cph=' + enc(cph)
              + '&herd='    + enc(String(herds[0].herd))
              + '&species=' + enc(sp)
              + '&type='    + enc(destType)
              + '&variant=' + enc(destVariant);
          html += '<a class="luis-card" href="' + url + '">' + inner + '</a>';
        } else {
          html += '<div class="luis-card" style="cursor:pointer;"'
            + ' data-dest="' + esc(dest) + '"'
            + ' data-cph="' + esc(cph) + '"'
            + ' data-species="' + esc(sp) + '"'
            + ' data-type="' + esc(destType) + '"'
            + ' data-variant="' + esc(destVariant) + '"'
            + ' data-card-title="' + esc(card.title) + '">'
            + inner + '</div>';
        }
      });
      html += '</div>';
    });
    panel.innerHTML = html;
  }

  // --- Wire selection; auto-select first species ---
  var items = listRoot.querySelectorAll('.species-item');
  items.forEach(function (item) {
    item.addEventListener('click', function () {
      items.forEach(function (el){ el.classList.remove('active'); });
      this.classList.add('active');
      renderPanel(this.getAttribute('data-species'));
    });
  });
  if (order.length) {
    var first = listRoot.querySelector('.species-item[data-species="' + order[0] + '"]');
    if (first) first.classList.add('active');
    renderPanel(order[0]);
  }

  // --- Flock picker popover ---
  var flockWrap = document.createElement('div');
  flockWrap.innerHTML =
      '<div class="flock-overlay" id="flock-overlay">'
    + '<div class="flock-popover-card">'
    +   '<div class="flock-popover__header">'
    +     '<div>'
    +       '<div class="flock-popover__title">Which flock is this order for?</div>'
    +       '<div class="flock-popover__sub" id="flock-popover-sub"></div>'
    +     '</div>'
    +     '<button class="flock-popover__dismiss" id="flock-dismiss" aria-label="Close">&times;</button>'
    +   '</div>'
    +   '<div id="flock-popover-body"></div>'
    + '</div>'
    + '</div>';
  document.body.appendChild(flockWrap.firstChild);

  var flockOverlay = document.getElementById('flock-overlay');
  var flockSub     = document.getElementById('flock-popover-sub');
  var flockBody    = document.getElementById('flock-popover-body');
  var flockDismiss = document.getElementById('flock-dismiss');

  function closeFlockPopover() { flockOverlay.style.display = 'none'; }

  function openFlockPopover(dest, cphVal, spVal, typeVal, variantVal, cardTitle) {
    flockSub.textContent = cardTitle + ' · ' + spVal;
    var herdList = bySpecies[spVal] || [];
    flockBody.innerHTML = herdList.map(function (h) {
      var mixed = '';
      if (h.species && h.species.length > 1) {
        mixed = ' <span class="flock-mixed-pill">mixed &middot; ' + h.species.map(esc).join(' + ') + '</span>';
      }
      var url = dest + '?cph=' + enc(cphVal)
              + '&herd='    + enc(String(h.herd))
              + '&species=' + enc(spVal)
              + '&type='    + enc(typeVal)
              + '&variant=' + enc(variantVal);
      return '<div class="flock-row" data-href="' + esc(url) + '">'
        + '<span>' + esc(h.groupType) + ' ' + esc(String(h.herd)) + mixed + '</span>'
        + '<i class="fas fa-arrow-right" style="color:#0d3349;font-size:0.75rem;flex-shrink:0;"></i>'
        + '</div>';
    }).join('');
    flockOverlay.style.display = 'block';
  }

  // Delegated click on #species-panel — survives renderPanel re-renders
  panel.addEventListener('click', function (e) {
    var card = e.target.closest('.luis-card[data-dest]');
    if (!card) return;
    openFlockPopover(
      card.getAttribute('data-dest'),
      card.getAttribute('data-cph'),
      card.getAttribute('data-species'),
      card.getAttribute('data-type'),
      card.getAttribute('data-variant'),
      card.getAttribute('data-card-title')
    );
  });

  // Flock row click → navigate immediately
  flockBody.addEventListener('click', function (e) {
    var row = e.target.closest('.flock-row');
    if (!row) return;
    var href = row.getAttribute('data-href');
    if (href) window.location.href = href;
  });

  // Close: × button, click-outside backdrop, Esc
  flockDismiss.addEventListener('click', closeFlockPopover);
  flockOverlay.addEventListener('click', function (e) { if (e.target === flockOverlay) closeFlockPopover(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' || e.key === 'Esc') closeFlockPopover(); });

})();
