import { HTMLAttributes } from 'react';

export default function UploadIcon(props: HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.73788 13.6272C5.96427 13.6272 5.31895 13.036 5.2514 12.2653C5.11015 10.6541 5.07441 9.03559 5.14427 7.42029C5.05994 7.41465 4.97563 7.40876 4.89133 7.40261L3.40178 7.29403C2.44973 7.22463 1.91752 6.16306 2.43151 5.35868C3.5277 3.64317 5.53693 1.72311 7.19038 0.535377C7.67419 0.187833 8.32584 0.187834 8.80966 0.535377C10.4631 1.72311 12.4723 3.64316 13.5685 5.35868C14.0825 6.16306 13.5503 7.22463 12.5983 7.29403L11.1087 7.40261C11.0244 7.40875 10.9401 7.41465 10.8558 7.42029C10.9256 9.03559 10.8899 10.6541 10.7486 12.2654C10.6811 13.036 10.0358 13.6272 9.26215 13.6272H6.73788ZM6.68148 6.7625C6.56777 8.54972 6.589 10.3431 6.74504 12.1272H9.25499C9.41103 10.3431 9.43226 8.54972 9.31855 6.7625C9.3058 6.56213 9.37392 6.36502 9.50766 6.21528C9.64141 6.06553 9.8296 5.97567 10.0301 5.96579C10.3535 5.94986 10.6767 5.93012 10.9997 5.90658L12.0815 5.82772C11.1219 4.41442 9.92042 3.18017 8.5313 2.18232L8.00002 1.80068L7.46873 2.18232C6.07962 3.18017 4.87813 4.41443 3.91858 5.82772L5.00038 5.90658C5.32337 5.93012 5.64656 5.94986 5.9699 5.96579C6.17043 5.97567 6.35863 6.06553 6.49237 6.21528C6.62611 6.36502 6.69423 6.56213 6.68148 6.7625Z" fill="black"/>
      <path d="M1.75 14C1.75 13.5858 1.41421 13.25 1 13.25C0.585786 13.25 0.25 13.5858 0.25 14V16C0.25 16.9665 1.0335 17.75 2 17.75H14C14.9665 17.75 15.75 16.9665 15.75 16V14C15.75 13.5858 15.4142 13.25 15 13.25C14.5858 13.25 14.25 13.5858 14.25 14V16C14.25 16.138 14.1381 16.25 14 16.25H2C1.86193 16.25 1.75 16.138 1.75 16V14Z" fill="black"/>
    </svg>
  );
}