using System;
using Xunit;

namespace MyService.xTests
{
    public class Calculator_IsEvenShould
    {
        private readonly Calculator calculator;

        public Calculator_IsEvenShould()
        {
            calculator = new Calculator();
        }

        [Fact]
        public void ReturnFalseGivenValueOf1()
        {
            var result = calculator.IsEven(1);

            Assert.False(result, "1 should not be even");
        }

        [Theory]
        [InlineData(0)]
        [InlineData(2)]
        [InlineData(100)]
        public void ReturnTrueGivenValue0_2_100(int value)
        {
            var result = calculator.IsEven(value);
            
            Assert.True(result, $"{value} should be even");
        }
    }
}