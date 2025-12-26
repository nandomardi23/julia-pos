<?php

namespace App\Helpers;

use App\Models\PaymentSetting;

class PaymentGatewayHelper
{
    /**
     * Get the default payment gateway with fallback to cash.
     * Checks if the default gateway is configured and ready.
     *
     * @param PaymentSetting|null $paymentSetting
     * @return string
     */
    public static function getDefaultGateway($paymentSetting): string
    {
        $defaultGateway = $paymentSetting?->default_gateway ?? 'cash';
        
        if (
            $defaultGateway !== 'cash' && 
            (!$paymentSetting || !$paymentSetting->isGatewayReady($defaultGateway))
        ) {
            return 'cash';
        }
        
        return $defaultGateway;
    }

    /**
     * Get all enabled payment gateways.
     *
     * @param PaymentSetting|null $paymentSetting
     * @return array
     */
    public static function getEnabledGateways($paymentSetting): array
    {
        return $paymentSetting?->enabledGateways() ?? [];
    }
}
