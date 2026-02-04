'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ShieldCheck, 
  BadgePercent, 
  Star,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function LoginModal({ open, onOpenChange }) {
  const [step, setStep] = useState('number'); // 'number' or 'otp'
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  
  const otpRef1 = useRef();
  const otpRef2 = useRef();
  const otpRef3 = useRef();
  const otpRef4 = useRef();
  const otpRefs = [otpRef1, otpRef2, otpRef3, otpRef4];

  useEffect(() => {
    let interval;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleContinue = () => {
    if (mobileNumber.length === 10) {
      setStep('otp');
      setTimer(30);
    }
  };

  const handleOtpChange = (index, value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue && value !== '') return;

    const newOtp = [...otp];
    newOtp[index] = cleanValue.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (cleanValue && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const resetModal = () => {
    setStep('number');
    setOtp(['', '', '', '']);
  };

  // Reset when dialog closes
  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(resetModal, 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[850px] p-0 overflow-hidden border-none gap-0 rounded-[2rem] sm:rounded-[2.5rem] bg-white shadow-2xl">
        <DialogTitle className="sr-only">Login to Wellbeing</DialogTitle>
        
        <div className="flex flex-col md:flex-row h-full min-h-[500px]">
          {/* Left Side: Branding & Benefits */}
          <div className="flex-1 bg-gradient-to-br from-[#e0e0e0] via-[#f5f5f5] to-[#ffffff] p-8 lg:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/40 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/5 rounded-full blur-3xl opacity-50" />

            <div className="relative z-10 space-y-8 w-full">
              {/* Logo & Sub-logo */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-foreground font-black text-2xl tracking-tighter shadow-sm bg-white">W</div>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Wellbeing</span>
                  <span className="text-xl uppercase font-black tracking-tighter">AYUBHAVA</span>
                </div>
                <div className="flex items-center gap-1.5 mt-4 opacity-40">
                  <span className="text-[8px] font-bold uppercase tracking-widest">Powered by</span>
                  <div className="font-black text-[10px] italic">GoKwik</div>
                </div>
              </div>

              <h2 className="text-xl lg:text-2xl font-black tracking-tight text-foreground leading-tight max-w-xs mx-auto">
                Welcome! Register to avail the best deals!
              </h2>

              {/* Benefits Grid */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-md mx-auto">
                {[
                  { icon: <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />, label: 'Zero Subscription Fees' },
                  { icon: <BadgePercent className="h-5 w-5 text-yellow-500 fill-yellow-500" />, label: 'Lowest price guaranteed' },
                  { icon: <ShieldCheck className="h-5 w-5 text-yellow-500 fill-yellow-500" />, label: '100% secure & spam free' },
                ].map((benefit, i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border border-white shadow-sm transition-transform hover:scale-105">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-inner">
                      {benefit.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase leading-tight tracking-tight text-foreground/70">
                      {benefit.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Login Form / OTP */}
          <div className="w-full md:w-[380px] bg-white p-8 lg:p-12 flex flex-col justify-center relative border-l border-muted/10 min-h-[500px]">
            {step === 'number' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black tracking-tight text-foreground leading-none">
                    Unlock <br />Superior Discounts
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-3 border-r border-muted-foreground/20">
                        <img src="https://flagcdn.com/in.svg" alt="India" className="w-5 h-3.5 rounded-sm shadow-sm" />
                        <span className="text-xs font-black">+91</span>
                      </div>
                      <Input 
                        type="tel"
                        maxLength={10}
                        placeholder="Enter Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        className="h-14 pl-24 rounded-xl bg-muted/30 border-none focus-visible:ring-primary/20 text-sm font-black tracking-widest placeholder:normal-case placeholder:tracking-normal placeholder:font-bold"
                      />
                    </div>

                    <div className="flex items-start space-x-3 px-1">
                      <Checkbox id="modal-notify" className="mt-1 rounded-sm border-2 border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                      <label 
                        htmlFor="modal-notify" 
                        className="text-[10px] font-bold text-muted-foreground leading-tight cursor-pointer select-none"
                      >
                        Notify me for any updates & offers
                      </label>
                    </div>
                  </div>

                  <Button 
                    onClick={handleContinue}
                    disabled={mobileNumber.length !== 10}
                    className="w-full h-14 bg-black hover:bg-black/90 text-white rounded-none font-black uppercase tracking-[0.2em] text-sm shadow-xl transition-all active:scale-[0.98]"
                  >
                    Continue
                  </Button>

                  <div className="space-y-4 text-center">
                    <p className="text-[9px] font-bold text-muted-foreground leading-relaxed px-4">
                      I accept that I have read & understood GoKwik's 
                      <button className="text-foreground hover:underline ml-1">Privacy Policy</button> and 
                      <button className="text-foreground hover:underline ml-1">T&Cs</button>.
                    </p>
                    
                    <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline block w-full mt-4">
                      Trouble logging in?
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tight text-foreground leading-none">
                    OTP Verification
                  </h3>
                  <div className="flex flex-col items-center gap-1 pt-2">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
                      We have sent verification code to
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-black text-foreground">+91 {mobileNumber}</span>
                      <button 
                        onClick={() => setStep('number')}
                        className="text-[10px] font-black text-primary border-2 border-primary/20 px-2.5 py-0.5 rounded-lg hover:bg-primary/5 transition-colors uppercase"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-center gap-3">
                    {otp.map((digit, idx) => (
                      <Input
                        key={idx}
                        ref={otpRefs[idx]}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className="h-14 w-14 text-center text-xl font-black rounded-xl bg-muted/30 border-none focus-visible:ring-primary/20 p-0 shadow-inner"
                      />
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {timer > 0 ? (
                        <span>Resend OTP in {timer} Sec</span>
                      ) : (
                        <button 
                          onClick={() => setTimer(30)}
                          className="text-primary hover:underline font-black uppercase tracking-wider"
                        >
                          Resend OTP Now
                        </button>
                      )}
                    </div>

                    <Button 
                      disabled={otp.some(d => !d)}
                      className="w-full h-14 bg-black hover:bg-black/90 text-white rounded-none font-black uppercase tracking-[0.2em] text-sm shadow-xl transition-all active:scale-[0.98]"
                    >
                      Verify
                    </Button>

                    <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline block w-full pt-4">
                      Trouble logging in?
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
