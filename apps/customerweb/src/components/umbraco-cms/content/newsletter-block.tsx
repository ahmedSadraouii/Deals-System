import React from 'react';
import Image from 'next/image';
import { FooterForm } from '@/components/footer/footer-form';

export function NewsletterBlock() {
  return (
    <div className="container mx-auto mb-16 w-full px-4">
      <div className="grid min-h-[700px] rounded-3xl bg-gradient-to-r from-blue-900 via-purple-800 to-purple-400 lg:grid-cols-2">
        <div
          className="hidden h-full w-full !bg-cover !bg-center lg:block"
          style={{ background: 'url("/img_2.png")' }}
        />
        <Image
          src="/img_2.png"
          width={250}
          height={250}
          alt=""
          className="mx-auto flex w-full md:hidden"
        />

        <div className="flex items-center justify-center md:p-20">
          <div className="w-full rounded-[20px] border border-white/20 bg-white/10 p-4 backdrop-blur-xl md:p-10">
            <FooterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
