import { HTMLAttributes } from 'react';

export default function InfoIcon(props: HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg width="24" height="44" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill-rule="evenodd" clipRule="evenodd" d="M12 28.4C15.5346 28.4 18.4 25.5346 18.4 22C18.4 18.4654 15.5346 15.6 12 15.6C8.46538 15.6 5.6 18.4654 5.6 22C5.6 25.5346 8.46538 28.4 12 28.4ZM20 22C20 26.4183 16.4183 30 12 30C7.58172 30 4 26.4183 4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22ZM12 26.8C11.5582 26.8 11.2 26.4418 11.2 26L11.2 21.2C11.2 20.7582 11.5582 20.4 12 20.4C12.4418 20.4 12.8 20.7582 12.8 21.2L12.8 26C12.8 26.4418 12.4418 26.8 12 26.8ZM12 18.8C11.5582 18.8 11.2 18.4418 11.2 18C11.2 17.5582 11.5582 17.2 12 17.2C12.4418 17.2 12.8 17.5582 12.8 18C12.8 18.4418 12.4418 18.8 12 18.8Z" fill="#A1A1A1"/>
    </svg>
  );
}